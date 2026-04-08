const pool = require('../config/db');

function parseOptionalNumber(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

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
  const normalizedReadTime = parseOptionalNumber(read_time);
  const normalizedLessonOrder = parseOptionalNumber(lesson_order);

  const [result] = await pool.query(
    `INSERT INTO lessons (module_id, title, description, content, read_time, lesson_order)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [module_id, title, description || '', content || '', normalizedReadTime, normalizedLessonOrder]
  );

  return {
    id: result.insertId,
    module_id,
    title,
    description: description || '',
    content: content || '',
    read_time: normalizedReadTime,
    lesson_order: normalizedLessonOrder,
  };
}


async function updateLesson(lessonId, lessonData) {
  const { module_id, title, description, content, read_time, lesson_order } = lessonData;
  const shouldUpdateModuleId = module_id !== undefined && module_id !== null && module_id !== '';
  const normalizedModuleId = shouldUpdateModuleId ? parseOptionalNumber(module_id) : null;
  const normalizedReadTime = parseOptionalNumber(read_time);
  const normalizedLessonOrder = parseOptionalNumber(lesson_order);

  const [result] = await pool.query(
    `UPDATE lessons
     SET module_id = COALESCE(?, module_id), title = ?, description = ?, content = ?, read_time = ?, lesson_order = ?
     WHERE id = ?`,
    [
      shouldUpdateModuleId ? normalizedModuleId : null,
      title,
      description || '',
      content || '',
      normalizedReadTime,
      normalizedLessonOrder,
      lessonId,
    ]
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
