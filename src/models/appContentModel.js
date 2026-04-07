const pool = require('../config/db');

async function getAppContent() {
  const [rows] = await pool.query(
    `SELECT id, welcome_title, welcome_description, motivation_text, motivation_quote
     FROM app_content
     WHERE id = 1
     LIMIT 1`
  );

  return rows[0] || null;
}

async function updateAppContent(payload) {
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
