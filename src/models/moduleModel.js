const pool = require('../config/db');

async function getAllModules() {
  const [rows] = await pool.query(
    `SELECT
       m.id,
       m.title,
       m.description,
       m.prerequisites,
       m.icon,
       m.image_url,
       m.background_color,
       m.order_index,
       COUNT(l.id) AS lesson_count,
       COALESCE(SUM(l.read_time), 0) AS total_read_time
     FROM modules m
     LEFT JOIN lessons l ON l.module_id = m.id
     GROUP BY m.id, m.title, m.description, m.prerequisites, m.icon, m.image_url, m.background_color, m.order_index
     ORDER BY m.order_index ASC, m.id ASC`
  );
  return rows;
}

async function getModuleById(moduleId) {
  const [rows] = await pool.query(
    `SELECT id, title, description, prerequisites, icon, image_url, background_color, order_index
     FROM modules
     WHERE id = ?
     LIMIT 1`,
    [moduleId]
  );

  return rows[0] || null;
}

async function createModule(moduleData) {
  const { title, description, prerequisites, icon, image_url, background_color, order_index } = moduleData;
  const [result] = await pool.query(
    `INSERT INTO modules (title, description, prerequisites, icon, image_url, background_color, order_index)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description || '', prerequisites || '', icon || 'book', image_url || null, background_color || '#EAF2FF', order_index || 0]
  );

  return {
    id: result.insertId,
    title,
    description: description || '',
    prerequisites: prerequisites || '',
    icon: icon || 'book',
    image_url: image_url || null,
    background_color: background_color || '#EAF2FF',
    order_index: order_index || 0,
  };
}

async function updateModule(moduleId, moduleData) {
  const { title, description, prerequisites, icon, image_url, background_color, order_index } = moduleData;
  const [result] = await pool.query(
    `UPDATE modules
     SET title = ?, description = ?, prerequisites = ?, icon = ?, image_url = ?, background_color = ?, order_index = ?
     WHERE id = ?`,
    [
      title,
      description || '',
      prerequisites || '',
      icon || 'book',
      image_url || null,
      background_color || '#EAF2FF',
      order_index || 0,
      moduleId,
    ]
  );

  return result.affectedRows;
}

async function deleteModule(moduleId) {
  const [result] = await pool.query('DELETE FROM modules WHERE id = ?', [moduleId]);
  return result.affectedRows;
}

module.exports = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
};
