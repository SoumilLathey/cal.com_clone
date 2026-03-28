import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'schedulo.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  initSchema(db);
  seedData(db);

  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT 'Demo User',
      username TEXT NOT NULL UNIQUE DEFAULT 'demo',
      email TEXT NOT NULL UNIQUE DEFAULT 'demo@schedulo.app',
      avatar TEXT,
      timezone TEXT NOT NULL DEFAULT 'America/New_York',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS event_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL DEFAULT 1,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      duration INTEGER NOT NULL DEFAULT 30,
      location TEXT DEFAULT 'Google Meet',
      color TEXT DEFAULT '#6366f1',
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS availability (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL DEFAULT 1,
      name TEXT NOT NULL DEFAULT 'Working Hours',
      timezone TEXT NOT NULL DEFAULT 'America/New_York',
      is_default INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS availability_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      availability_id INTEGER NOT NULL,
      day_of_week INTEGER NOT NULL,
      is_enabled INTEGER NOT NULL DEFAULT 0,
      start_time TEXT NOT NULL DEFAULT '09:00',
      end_time TEXT NOT NULL DEFAULT '17:00',
      FOREIGN KEY (availability_id) REFERENCES availability(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL DEFAULT 1,
      booker_name TEXT NOT NULL,
      booker_email TEXT NOT NULL,
      start_time DATETIME NOT NULL,
      end_time DATETIME NOT NULL,
      status TEXT NOT NULL DEFAULT 'upcoming',
      notes TEXT,
      uid TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

function seedData(db: Database.Database) {
  const userCount = (db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }).count;
  if (userCount > 0) return;

  // Insert default user
  db.prepare(`
    INSERT INTO users (name, username, email, timezone)
    VALUES ('Admin', 'alex', 'admin@schedulo.app', 'America/New_York')
  `).run();

  // Insert event types
  const eventTypes = [
    {
      title: '15 Minute Meeting',
      slug: '15min',
      description: 'Quick sync call to discuss ideas or answer questions.',
      duration: 15,
      location: 'Google Meet',
      color: '#6366f1',
    },
    {
      title: '30 Minute Meeting',
      slug: '30min',
      description: 'A standard meeting to discuss topics in depth.',
      duration: 30,
      location: 'Google Meet',
      color: '#8b5cf6',
    },
    {
      title: '1 Hour Deep Dive',
      slug: '1hour',
      description: 'A comprehensive session for detailed discussions and planning.',
      duration: 60,
      location: 'Zoom',
      color: '#ec4899',
    },
    {
      title: 'Product Demo',
      slug: 'product-demo',
      description: 'See our product in action and get your questions answered.',
      duration: 45,
      location: 'Google Meet',
      color: '#f59e0b',
    },
  ];

  const insertEvent = db.prepare(`
    INSERT INTO event_types (user_id, title, slug, description, duration, location, color)
    VALUES (1, ?, ?, ?, ?, ?, ?)
  `);
  for (const et of eventTypes) {
    insertEvent.run(et.title, et.slug, et.description, et.duration, et.location, et.color);
  }

  // Insert default availability
  db.prepare(`
    INSERT INTO availability (user_id, name, timezone, is_default)
    VALUES (1, 'Working Hours', 'America/New_York', 1)
  `).run();

  const availId = (db.prepare('SELECT last_insert_rowid() as id').get() as { id: number }).id;

  // Days: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const days = [
    { day: 0, enabled: 0, start: '09:00', end: '17:00' },
    { day: 1, enabled: 1, start: '09:00', end: '17:00' },
    { day: 2, enabled: 1, start: '09:00', end: '17:00' },
    { day: 3, enabled: 1, start: '09:00', end: '17:00' },
    { day: 4, enabled: 1, start: '09:00', end: '17:00' },
    { day: 5, enabled: 1, start: '09:00', end: '17:00' },
    { day: 6, enabled: 0, start: '09:00', end: '17:00' },
  ];

  const insertDay = db.prepare(`
    INSERT INTO availability_days (availability_id, day_of_week, is_enabled, start_time, end_time)
    VALUES (?, ?, ?, ?, ?)
  `);
  for (const d of days) {
    insertDay.run(availId, d.day, d.enabled, d.start, d.end);
  }

  // Seed some bookings
  const now = new Date();
  const bookings = [
    {
      event_type_id: 2,
      booker_name: 'Sarah Chen',
      booker_email: 'sarah@example.com',
      start: addDays(now, 2, 10, 0),
      end: addDays(now, 2, 10, 30),
      status: 'upcoming',
      uid: generateUid(),
    },
    {
      event_type_id: 1,
      booker_name: 'Marcus Rivera',
      booker_email: 'marcus@example.com',
      start: addDays(now, 3, 14, 0),
      end: addDays(now, 3, 14, 15),
      status: 'upcoming',
      uid: generateUid(),
    },
    {
      event_type_id: 4,
      booker_name: 'Emma Wilson',
      booker_email: 'emma@example.com',
      start: addDays(now, 5, 11, 0),
      end: addDays(now, 5, 11, 45),
      status: 'upcoming',
      uid: generateUid(),
    },
    {
      event_type_id: 2,
      booker_name: 'James Park',
      booker_email: 'james@example.com',
      start: addDays(now, -3, 9, 0),
      end: addDays(now, -3, 9, 30),
      status: 'past',
      uid: generateUid(),
    },
    {
      event_type_id: 3,
      booker_name: 'Olivia Brown',
      booker_email: 'olivia@example.com',
      start: addDays(now, -7, 15, 0),
      end: addDays(now, -7, 16, 0),
      status: 'past',
      uid: generateUid(),
    },
    {
      event_type_id: 1,
      booker_name: 'Daniel Kim',
      booker_email: 'daniel@example.com',
      start: addDays(now, -10, 13, 0),
      end: addDays(now, -10, 13, 15),
      status: 'cancelled',
      uid: generateUid(),
    },
  ];

  const insertBooking = db.prepare(`
    INSERT INTO bookings (event_type_id, user_id, booker_name, booker_email, start_time, end_time, status, uid)
    VALUES (?, 1, ?, ?, ?, ?, ?, ?)
  `);

  for (const b of bookings) {
    insertBooking.run(b.event_type_id, b.booker_name, b.booker_email, b.start, b.end, b.status, b.uid);
  }
}

function addDays(date: Date, days: number, hours: number, minutes: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}

function generateUid(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
