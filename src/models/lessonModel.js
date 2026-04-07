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
  const { module_id, title, description, content, read_time, lesson_order } = lessonData;

  // Build dynamic query based on provided fields
  const updates = [];
  const values = [];

  if (title !== undefined) {
    updates.push('title = ?');
    values.push(title);
  }
  if (description !== undefined) {
    updates.push('description = ?');
    values.push(description || '');
  }
  if (content !== undefined) {
    updates.push('content = ?');
    values.push(content || '');
  }
  if (read_time !== undefined) {
    updates.push('read_time = ?');
    values.push(read_time || 5);
  }
  if (lesson_order !== undefined) {
    updates.push('lesson_order = ?');
    values.push(lesson_order || 0);
  }
  if (module_id !== undefined) {
    updates.push('module_id = ?');
    values.push(module_id);
  }

  if (!updates.length) {
    return 0;
  }

  values.push(lessonId);

  const [result] = await pool.query(
    `UPDATE lessons
     SET ${updates.join(', ')}
     WHERE id = ?`,
    values
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
