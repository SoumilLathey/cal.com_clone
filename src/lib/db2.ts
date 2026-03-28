import mysql from 'mysql2/promise';

/**
 * MySQL Production DB Client
 * Supports connection pooling and auto-schema initialization.
 */

let pool: mysql.Pool | null = null;

function getPool() {
  if (pool) return pool;

  const connectionString = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL || process.env.DATABASE_URL;

  if (connectionString) {
    // Use the full URL directly - better for complex passwords and ports
    pool = mysql.createPool({
      uri: connectionString,
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
    });
  } else if (process.env.MYSQLHOST) {
    // Fallback to individual variables
    pool = mysql.createPool({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: Number(process.env.MYSQLPORT || 3306),
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
    });
  } else {
    throw new Error('Database connection variables (MYSQL_URL or MYSQLHOST) are missing.');
  }

  return pool;
}

export async function dbAll<T = any>(sql: string, args: any[] = []): Promise<T[]> {
  const [rows] = await getPool().execute(sql, args);
  return rows as T[];
}

export async function dbGet<T = any>(sql: string, args: any[] = []): Promise<T | undefined> {
  const rows = await dbAll<T>(sql, args);
  return rows[0];
}

export async function dbRun(sql: string, args: any[] = []): Promise<{ rowsAffected: number; lastInsertRowid: number | null }> {
  const [result]: any = await getPool().execute(sql, args);
  return {
    rowsAffected: result.affectedRows || 0,
    lastInsertRowid: result.insertId || null
  };
}

// ─── MySQL Schema ────────────────────────────────────────────────────────────

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL DEFAULT 'Demo User',
    username VARCHAR(255) NOT NULL UNIQUE DEFAULT 'demo',
    email VARCHAR(255) NOT NULL UNIQUE DEFAULT 'demo@cal.com',
    avatar TEXT, 
    timezone VARCHAR(255) NOT NULL DEFAULT 'America/New_York',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS event_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL DEFAULT 1,
    title VARCHAR(255) NOT NULL, 
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT, 
    duration INT NOT NULL DEFAULT 30,
    location VARCHAR(255) DEFAULT 'Google Meet', 
    color VARCHAR(7) DEFAULT '#6366f1',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    buffer_time INT NOT NULL DEFAULT 0,
    custom_questions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (user_id)
  )`,
  `CREATE TABLE IF NOT EXISTS availability (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL DEFAULT 1,
    name VARCHAR(255) NOT NULL DEFAULT 'Working Hours',
    timezone VARCHAR(255) NOT NULL DEFAULT 'America/New_York',
    is_default TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (user_id)
  )`,
  `CREATE TABLE IF NOT EXISTS availability_days (
    id INT PRIMARY KEY AUTO_INCREMENT,
    availability_id INT NOT NULL,
    day_of_week INT NOT NULL,
    is_enabled TINYINT(1) NOT NULL DEFAULT 0,
    start_time VARCHAR(5) NOT NULL DEFAULT '09:00',
    end_time VARCHAR(5) NOT NULL DEFAULT '17:00',
    INDEX (availability_id)
  )`,
  `CREATE TABLE IF NOT EXISTS date_overrides (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL DEFAULT 1,
    date DATE NOT NULL,
    is_blocked TINYINT(1) NOT NULL DEFAULT 0,
    start_time VARCHAR(5),
    end_time VARCHAR(5),
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (user_id)
  )`,
  `CREATE TABLE IF NOT EXISTS bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_type_id INT NOT NULL,
    user_id INT NOT NULL DEFAULT 1,
    booker_name VARCHAR(255) NOT NULL, 
    booker_email VARCHAR(255) NOT NULL,
    start_time DATETIME NOT NULL, 
    end_time DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'upcoming',
    notes TEXT, 
    uid VARCHAR(255) NOT NULL UNIQUE,
    answers TEXT,
    rescheduled_from VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (event_type_id),
    INDEX (user_id)
  )`,
  // ─── Migrations ───────────────────────────────────────────────────────────
  `ALTER TABLE event_types ADD COLUMN buffer_time INT NOT NULL DEFAULT 0`,
  `ALTER TABLE event_types ADD COLUMN custom_questions TEXT`,
  `ALTER TABLE bookings ADD COLUMN answers TEXT`,
  `ALTER TABLE bookings ADD COLUMN rescheduled_from VARCHAR(255)`,
  `ALTER TABLE availability ADD COLUMN is_default TINYINT(1) NOT NULL DEFAULT 0`
];

let hasBeenInitialized = false;

export async function initDb(): Promise<void> {
  if (hasBeenInitialized) return;
  try {
    const p = getPool();
    console.log('--- Initializing MySQL Database ---');

    // 1. Initial Table Creation
    for (const stmt of SCHEMA_STATEMENTS.slice(0, 6)) {
      await p.query(stmt);
    }

    // 2. Column Migrations
    for (const stmt of SCHEMA_STATEMENTS.slice(6)) {
      await p.query(stmt).catch(() => null);
    }

    // 3. Granular Seeding
    const [uCount]: any = await p.query('SELECT COUNT(*) as c FROM users');
    if (uCount[0].c === 0) {
      console.log('Seeding Users...');
      await p.query(`INSERT INTO users (name,username,email,timezone) VALUES ('Admin','alex','admin@cal.com','America/New_York')`);
    }

    const [eCount]: any = await p.query('SELECT COUNT(*) as c FROM event_types');
    if (eCount[0].c === 0) {
      console.log('Seeding Event Types...');
      const events = [
        ['15 Minute Meeting', '15min', 'Quick sync call.', 15, 'Google Meet', '#6366f1', 5, '[]'],
        ['30 Minute Meeting', '30min', 'Standard meeting.', 30, 'Google Meet', '#8b5cf6', 10, '[]'],
        ['1 Hour Deep Dive', '1hour', 'Comprehensive session.', 60, 'Zoom', '#ec4899', 15, '[]'],
        ['Product Demo', 'product-demo', 'See our product in action.', 45, 'Google Meet', '#f59e0b', 10, '[]']
      ];
      for (const e of events) {
        await p.query(`INSERT INTO event_types (user_id,title,slug,description,duration,location,color,buffer_time,custom_questions) VALUES (1,?,?,?,?,?,?,?,?)`, e);
      }
    }

    const [aCount]: any = await p.query('SELECT COUNT(*) as c FROM availability');
    if (aCount[0].c === 0) {
      console.log('Seeding Availability...');
      const [availRes]: any = await p.query(`INSERT INTO availability (user_id,name,timezone,is_default) VALUES (1,'Working Hours','America/New_York',1)`);
      const aid = availRes.insertId;
      const days = [[aid, 0, 0], [aid, 1, 1], [aid, 2, 1], [aid, 3, 1], [aid, 4, 1], [aid, 5, 1], [aid, 6, 0]];
      for (const d of days) {
        await p.query(`INSERT INTO availability_days (availability_id,day_of_week,is_enabled,start_time,end_time) VALUES (?,?,?, '09:00', '17:00')`, d);
      }
    }

    hasBeenInitialized = true;
    console.log('--- MySQL Database Ready ---');
  } catch (error) {
    console.error('MySQL initialization failed:', error);
  }
}
