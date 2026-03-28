/**
 * Turso HTTP API client — pure fetch, zero npm dependencies.
 * Locally falls back to better-sqlite3 if TURSO_URL is unset.
 * (hot reload trigger)
 */

type SqlValue = string | number | null | boolean;

interface TursoResult {
  rows: Record<string, SqlValue>[];
  rowsAffected: number;
  lastInsertRowid: number | null;
}

async function tursoQuery(sql: string, args: SqlValue[] = []): Promise<TursoResult> {
  let url = process.env.TURSO_URL!;
  const token = process.env.TURSO_AUTH_TOKEN!;
  
  if (url.startsWith('libsql://')) url = url.replace('libsql://', 'https://');
  if (url.endsWith('/')) url = url.slice(0, -1);

  const res = await fetch(`${url}/v2/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [
        { type: 'execute', stmt: { sql, args: args.map(valueToTurso) } },
        { type: 'close' },
      ],
    }),
    cache: 'no-store',
  });
  if (!res.ok) { const b = await res.text(); throw new Error(`Turso ${res.status}: ${b}`); }
  const data = await res.json() as {
    results: Array<{ type: string; response?: { result: { cols: Array<{ name: string }>; rows: Array<Array<{ type: string; value: string }>>; rows_affected: number; last_insert_rowid: string | null } } }>;
  };
  const r = data.results[0];
  if (r.type !== 'ok' || !r.response) throw new Error('Turso query failed');
  const result = r.response.result;
  const cols = result.cols.map(c => c.name);
  return {
    rows: result.rows.map(row => Object.fromEntries(cols.map((col, i) => [col, parseValue(row[i])]))),
    rowsAffected: result.rows_affected,
    lastInsertRowid: result.last_insert_rowid ? Number(result.last_insert_rowid) : null,
  };
}

function valueToTurso(val: SqlValue): { type: string; value: string } {
  if (val === null) return { type: 'null', value: 'null' };
  if (typeof val === 'boolean') return { type: 'integer', value: val ? '1' : '0' };
  if (typeof val === 'number') return { type: Number.isInteger(val) ? 'integer' : 'float', value: String(val) };
  return { type: 'text', value: String(val) };
}
function parseValue(cell: { type: string; value: string }): SqlValue {
  if (!cell || cell.type === 'null') return null;
  if (cell.type === 'integer') return Number(cell.value);
  if (cell.type === 'float') return parseFloat(cell.value);
  return cell.value;
}

let _localDb: import('better-sqlite3').Database | null = null;

async function localQuery(sql: string, args: SqlValue[] = []): Promise<TursoResult> {
  if (!_localDb) {
    const Database = (await import('better-sqlite3')).default;
    const path = await import('path');
    const fs = await import('fs');
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    _localDb = new Database(path.join(dir, 'schedulo.db'));
    _localDb.pragma('journal_mode = WAL');
    _localDb.pragma('foreign_keys = ON');

    // Run each statement individually — ALTER TABLE may fail if column already exists, that's OK
    for (const stmt of SCHEMA_STATEMENTS) {
      try {
        _localDb.exec(stmt);
      } catch {
        // Silently ignore "column already exists" and similar migration errors
      }
    }

    await seedLocalData(_localDb);
  }

  const isSelect = /^\s*select/i.test(sql.trim());
  if (!isSelect) {
    const info = _localDb.prepare(sql).run(...args);
    return { rows: [], rowsAffected: info.changes, lastInsertRowid: info.lastInsertRowid as number };
  }
  return { rows: _localDb.prepare(sql).all(...args) as Record<string, SqlValue>[], rowsAffected: 0, lastInsertRowid: null };
}

export const isTurso = () => !!process.env.TURSO_URL;

export async function dbAll<T = Record<string, SqlValue>>(sql: string, args: SqlValue[] = []): Promise<T[]> {
  const r = isTurso() ? await tursoQuery(sql, args) : await localQuery(sql, args);
  return r.rows as T[];
}
export async function dbGet<T = Record<string, SqlValue>>(sql: string, args: SqlValue[] = []): Promise<T | undefined> {
  return (await dbAll<T>(sql, args))[0];
}
export async function dbRun(sql: string, args: SqlValue[] = []): Promise<{ rowsAffected: number; lastInsertRowid: number | null }> {
  const r = isTurso() ? await tursoQuery(sql, args) : await localQuery(sql, args);
  return { rowsAffected: r.rowsAffected, lastInsertRowid: r.lastInsertRowid };
}

// ─── Schema ──────────────────────────────────────────────────────────────────

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL DEFAULT 'Demo User',
    username TEXT NOT NULL UNIQUE DEFAULT 'demo',
    email TEXT NOT NULL UNIQUE DEFAULT 'demo@schedulo.app',
    avatar TEXT, timezone TEXT NOT NULL DEFAULT 'America/New_York',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS event_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
    description TEXT, duration INTEGER NOT NULL DEFAULT 30,
    location TEXT DEFAULT 'Google Meet', color TEXT DEFAULT '#6366f1',
    is_active INTEGER NOT NULL DEFAULT 1,
    buffer_time INTEGER NOT NULL DEFAULT 0,
    custom_questions TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL DEFAULT 1,
    name TEXT NOT NULL DEFAULT 'Working Hours',
    timezone TEXT NOT NULL DEFAULT 'America/New_York',
    is_default INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS availability_days (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    availability_id INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL,
    is_enabled INTEGER NOT NULL DEFAULT 0,
    start_time TEXT NOT NULL DEFAULT '09:00',
    end_time TEXT NOT NULL DEFAULT '17:00',
    FOREIGN KEY (availability_id) REFERENCES availability(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS date_overrides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL DEFAULT 1,
    date TEXT NOT NULL,
    is_blocked INTEGER NOT NULL DEFAULT 0,
    start_time TEXT,
    end_time TEXT,
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL DEFAULT 1,
    booker_name TEXT NOT NULL, booker_email TEXT NOT NULL,
    start_time DATETIME NOT NULL, end_time DATETIME NOT NULL,
    status TEXT NOT NULL DEFAULT 'upcoming',
    notes TEXT, uid TEXT NOT NULL UNIQUE,
    answers TEXT DEFAULT '[]',
    rescheduled_from TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`,
  // Migration helpers — safe to run on existing DBs
  `ALTER TABLE event_types ADD COLUMN buffer_time INTEGER NOT NULL DEFAULT 0`,
  `ALTER TABLE event_types ADD COLUMN custom_questions TEXT DEFAULT '[]'`,
  `ALTER TABLE bookings ADD COLUMN answers TEXT DEFAULT '[]'`,
  `ALTER TABLE bookings ADD COLUMN rescheduled_from TEXT`,
];

// These migration stmts may fail if columns already exist — that's fine
const SAFE_MIGRATION_STMTS = SCHEMA_STATEMENTS.slice(-4);
const CORE_SCHEMA_STMTS = SCHEMA_STATEMENTS.slice(0, -4);

export async function initDb(): Promise<void> {
  if (!isTurso()) return; // local: handled lazily in localQuery
  for (const stmt of CORE_SCHEMA_STMTS) await tursoQuery(stmt);
  // Run migrations silently (ignore "column already exists" errors)
  for (const stmt of SAFE_MIGRATION_STMTS) {
    await tursoQuery(stmt).catch(() => null);
  }
  const users = await dbAll('SELECT COUNT(*) as count FROM users');
  if ((users[0] as { count: number }).count === 0) await seedTursoData();
}

// ─── Seeds ────────────────────────────────────────────────────────────────────

function uid() { return Math.random().toString(36).substring(2) + Date.now().toString(36); }
function addDays(base: Date, days: number, h: number, m: number) {
  const d = new Date(base); d.setDate(d.getDate() + days); d.setHours(h, m, 0, 0); return d.toISOString();
}

async function seedLocalData(db: import('better-sqlite3').Database) {
  if ((db.prepare('SELECT COUNT(*) as c FROM users').get() as { c: number }).c > 0) return;
  db.prepare(`INSERT INTO users (name,username,email,timezone) VALUES ('Admin','alex','admin@schedulo.app','America/New_York')`).run();
  const events = [
    { title: '15 Minute Meeting', slug: '15min', desc: 'Quick sync call.', duration: 15, loc: 'Google Meet', color: '#6366f1', buf: 5 },
    { title: '30 Minute Meeting', slug: '30min', desc: 'Standard meeting.', duration: 30, loc: 'Google Meet', color: '#8b5cf6', buf: 10 },
    { title: '1 Hour Deep Dive', slug: '1hour', desc: 'Comprehensive session.', duration: 60, loc: 'Zoom', color: '#ec4899', buf: 15 },
    { title: 'Product Demo', slug: 'product-demo', desc: 'See our product in action.', duration: 45, loc: 'Google Meet', color: '#f59e0b', buf: 10 },
  ];
  for (const e of events) {
    const q = JSON.stringify([{ id: '1', label: 'What would you like to discuss?', type: 'textarea', required: false }]);
    db.prepare(`INSERT INTO event_types (user_id,title,slug,description,duration,location,color,buffer_time,custom_questions) VALUES (1,?,?,?,?,?,?,?,?)`).run(e.title, e.slug, e.desc, e.duration, e.loc, e.color, e.buf, q);
  }
  db.prepare(`INSERT INTO availability (user_id,name,timezone,is_default) VALUES (1,'Working Hours','America/New_York',1)`).run();
  const aid = (db.prepare('SELECT last_insert_rowid() as id').get() as { id: number }).id;
  for (const [day, on] of [[0,0],[1,1],[2,1],[3,1],[4,1],[5,1],[6,0]]) {
    db.prepare(`INSERT INTO availability_days (availability_id,day_of_week,is_enabled,start_time,end_time) VALUES (?,?,?,'09:00','17:00')`).run(aid, day, on);
  }
  const now = new Date();
  const seeds = [
    { et: 2, n: 'Sarah Chen', e: 'sarah@example.com', d: 2, h: 10, m: 0, dur: 30, s: 'upcoming' },
    { et: 1, n: 'Marcus Rivera', e: 'marcus@example.com', d: 3, h: 14, m: 0, dur: 15, s: 'upcoming' },
    { et: 4, n: 'Emma Wilson', e: 'emma@example.com', d: 5, h: 11, m: 0, dur: 45, s: 'upcoming' },
    { et: 2, n: 'James Park', e: 'james@example.com', d: -3, h: 9, m: 0, dur: 30, s: 'past' },
    { et: 3, n: 'Olivia Brown', e: 'olivia@example.com', d: -7, h: 15, m: 0, dur: 60, s: 'past' },
  ];
  for (const b of seeds) {
    const start = addDays(now, b.d, b.h, b.m);
    const end = new Date(new Date(start).getTime() + b.dur * 60000).toISOString();
    db.prepare(`INSERT INTO bookings (event_type_id,user_id,booker_name,booker_email,start_time,end_time,status,uid,answers) VALUES (?,1,?,?,?,?,?,?,'[]')`).run(b.et, b.n, b.e, start, end, b.s, uid());
  }
}

async function seedTursoData() {
  await dbRun(`INSERT INTO users (name,username,email,timezone) VALUES ('Admin','alex','admin@schedulo.app','America/New_York')`);
  const q = JSON.stringify([{ id: '1', label: 'What would you like to discuss?', type: 'textarea', required: false }]);
  const events = [
    { title: '15 Minute Meeting', slug: '15min', desc: 'Quick sync.', dur: 15, loc: 'Google Meet', color: '#6366f1', buf: 5 },
    { title: '30 Minute Meeting', slug: '30min', desc: 'Standard meeting.', dur: 30, loc: 'Google Meet', color: '#8b5cf6', buf: 10 },
    { title: '1 Hour Deep Dive', slug: '1hour', desc: 'Comprehensive session.', dur: 60, loc: 'Zoom', color: '#ec4899', buf: 15 },
    { title: 'Product Demo', slug: 'product-demo', desc: 'Product demo.', dur: 45, loc: 'Google Meet', color: '#f59e0b', buf: 10 },
  ];
  for (const e of events) await dbRun(`INSERT INTO event_types (user_id,title,slug,description,duration,location,color,buffer_time,custom_questions) VALUES (1,?,?,?,?,?,?,?,?)`, [e.title, e.slug, e.desc, e.dur, e.loc, e.color, e.buf, q]);
  const avail = await dbRun(`INSERT INTO availability (user_id,name,timezone,is_default) VALUES (1,'Working Hours','America/New_York',1)`);
  const aid = avail.lastInsertRowid!;
  for (const [day, on] of [[0,0],[1,1],[2,1],[3,1],[4,1],[5,1],[6,0]]) await dbRun(`INSERT INTO availability_days (availability_id,day_of_week,is_enabled,start_time,end_time) VALUES (?,?,?,'09:00','17:00')`, [aid, day, on]);
}
