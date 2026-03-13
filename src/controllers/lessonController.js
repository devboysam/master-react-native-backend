const lessonModel = require('../models/lessonModel');

async function getLessonById(req, res, next) {
  try {
    const lessonId = Number(req.params.id);

    if (Number.isNaN(lessonId)) {
      return res.status(400).json({ success: false, message: 'Invalid lesson id' });
    }

    const lesson = await lessonModel.getLessonById(lessonId);

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    return res.json({ success: true, data: lesson });
  } catch (error) {
    return next(error);
  }
}

async function createLesson(req, res, next) {
  try {
    const { module_id, title, description, content, read_time, lesson_order } = req.body;
    const parsedModuleId = Number(module_id);

    if (!module_id || !title) {
      return res.status(400).json({
        success: false,
        message: 'module_id and title are required',
      });
    }

    if (Number.isNaN(parsedModuleId)) {
      return res.status(400).json({
        success: false,
        message: 'module_id must be a valid number',
      });
    }

    const lesson = await lessonModel.createLesson({
      module_id: parsedModuleId,
      title,
      description,
      content,
      read_time,
      lesson_order,
    });

    return res.status(201).json({ success: true, data: lesson });
  } catch (error) {
    return next(error);
  }
}

async function updateLesson(req, res, next) {
  try {
    const lessonId = Number(req.params.id);
    const { title, description, content, read_time, lesson_order } = req.body;

    if (Number.isNaN(lessonId)) {
      return res.status(400).json({ success: false, message: 'Invalid lesson id' });
    }

    if (!title) {
      return res.status(400).json({ success: false, message: 'title is required' });
    }

    const affectedRows = await lessonModel.updateLesson(lessonId, {
      title,
      description,
      content,
      read_time,
      lesson_order,
    });

    if (!affectedRows) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    const updated = await lessonModel.getLessonById(lessonId);
    return res.json({ success: true, data: updated });
  } catch (error) {
    return next(error);
  }
}

async function deleteLesson(req, res, next) {
  try {
    const lessonId = Number(req.params.id);

    if (Number.isNaN(lessonId)) {
      return res.status(400).json({ success: false, message: 'Invalid lesson id' });
    }

    const affectedRows = await lessonModel.deleteLesson(lessonId);

    if (!affectedRows) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    return res.json({ success: true, message: 'Lesson deleted' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};
