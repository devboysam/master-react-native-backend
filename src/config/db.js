const mysql = require('mysql2/promise');

const useSsl = String(process.env.DB_SSL || '').toLowerCase() === 'true';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'course_learning',
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 10000),
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 30,
  maxIdle: 15000,
  idleTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

module.exports = pool;
