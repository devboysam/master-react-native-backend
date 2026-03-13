const pool = require('../config/db');

async function ensureRowExists() {
  await pool.query(
    `INSERT INTO app_content (id, welcome_title, welcome_description, motivation_text, motivation_quote)
     VALUES (1, 'Welcome to Learn React', 'Master React.js through structured modules and hands-on practice', 'Keep up the great work!', 'Consistency is key to mastering any skill. Keep practicing every day!')
     ON DUPLICATE KEY UPDATE id = id`
  );
}

async function getAppContent() {
  await ensureRowExists();
  const [rows] = await pool.query(
    `SELECT id, welcome_title, welcome_description, motivation_text, motivation_quote
     FROM app_content
     WHERE id = 1
     LIMIT 1`
  );

  return rows[0] || null;
}

async function updateAppContent(payload) {
  await ensureRowExists();
  const { welcome_title, welcome_description, motivation_text, motivation_quote } = payload;

  await pool.query(
    `UPDATE app_content
     SET welcome_title = ?, welcome_description = ?, motivation_text = ?, motivation_quote = ?
     WHERE id = 1`,
    [welcome_title, welcome_description, motivation_text, motivation_quote]
  );

  return getAppContent();
}

module.exports = {
  getAppContent,
  updateAppContent,
};
