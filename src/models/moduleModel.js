const pool = require('../config/db');

async function getAllModules() {
  const [rows] = await pool.query(
    `SELECT id, title, description, icon, order_index
     FROM modules
     ORDER BY order_index ASC, id ASC`
  );
  return rows;
}

async function createModule(moduleData) {
  const { title, description, icon, order_index } = moduleData;
  const [result] = await pool.query(
    `INSERT INTO modules (title, description, icon, order_index)
     VALUES (?, ?, ?, ?)`,
    [title, description || '', icon || 'book', order_index || 0]
  );

  return {
    id: result.insertId,
    title,
    description: description || '',
    icon: icon || 'book',
    order_index: order_index || 0,
  };
}

module.exports = {
  getAllModules,
  createModule,
};
