const pool = require('../config/db');

async function getLessonsByModuleId(moduleId) {
  const [rows] = await pool.query(
    `SELECT id, module_id, title, description, read_time, lesson_order
     FROM lessons
     WHERE module_id = ?
     ORDER BY lesson_order ASC, id ASC`,
    [moduleId]
  );

  return rows;
}

async function getLessonById(lessonId) {
  const [rows] = await pool.query(
    `SELECT id, module_id, title, description, content, read_time, lesson_order
     FROM lessons
     WHERE id = ?
     LIMIT 1`,
    [lessonId]
  );

  return rows[0] || null;
}

async function createLesson(lessonData) {
  const { module_id, title, description, content, read_time, lesson_order } = lessonData;

  const [result] = await pool.query(
    `INSERT INTO lessons (module_id, title, description, content, read_time, lesson_order)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [module_id, title, description || '', content || '', read_time || 5, lesson_order || 0]
  );

  return {
    id: result.insertId,
    module_id,
    title,
    description: description || '',
    content: content || '',
    read_time: read_time || 5,
    lesson_order: lesson_order || 0,
  };
}


async function updateLesson(lessonId, lessonData) {
  const { title, description, content, read_time, lesson_order } = lessonData;

  const [result] = await pool.query(
    `UPDATE lessons
     SET title = ?, description = ?, content = ?, read_time = ?, lesson_order = ?
     WHERE id = ?`,
    [title, description || '', content || '', read_time || 5, lesson_order || 0, lessonId]
  );

  return result.affectedRows;
}

async function deleteLesson(lessonId) {
  const [result] = await pool.query('DELETE FROM lessons WHERE id = ?', [lessonId]);
  return result.affectedRows;
}

module.exports = {
  getLessonsByModuleId,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};
