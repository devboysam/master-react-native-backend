const lessonModel = require('../models/lessonModel');

function parseOptionalNumber(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

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
    const normalizedTitle = String(title || '').trim();
    const parsedReadTime = parseOptionalNumber(read_time);
    const parsedLessonOrder = parseOptionalNumber(lesson_order);

    if (!module_id || !normalizedTitle) {
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

    if (Number.isNaN(parsedReadTime)) {
      return res.status(400).json({
        success: false,
        message: 'read_time must be a valid number when provided',
      });
    }

    if (Number.isNaN(parsedLessonOrder)) {
      return res.status(400).json({
        success: false,
        message: 'lesson_order must be a valid number when provided',
      });
    }

    const lesson = await lessonModel.createLesson({
      module_id: parsedModuleId,
      title: normalizedTitle,
      description,
      content,
      read_time: parsedReadTime,
      lesson_order: parsedLessonOrder,
    });

    return res.status(201).json({ success: true, data: lesson });
  } catch (error) {
    return next(error);
  }
}

async function updateLesson(req, res, next) {
  try {
    const lessonId = Number(req.params.id);
    const { module_id, title, description, content, read_time, lesson_order } = req.body;
    const normalizedTitle = String(title || '').trim();
    const parsedModuleId = parseOptionalNumber(module_id);
    const parsedReadTime = parseOptionalNumber(read_time);
    const parsedLessonOrder = parseOptionalNumber(lesson_order);

    if (Number.isNaN(lessonId)) {
      return res.status(400).json({ success: false, message: 'Invalid lesson id' });
    }

    if (!normalizedTitle) {
      return res.status(400).json({ success: false, message: 'title is required' });
    }

    if (module_id !== undefined && Number.isNaN(parsedModuleId)) {
      return res.status(400).json({ success: false, message: 'module_id must be a valid number when provided' });
    }

    if (Number.isNaN(parsedReadTime)) {
      return res.status(400).json({ success: false, message: 'read_time must be a valid number when provided' });
    }

    if (Number.isNaN(parsedLessonOrder)) {
      return res.status(400).json({ success: false, message: 'lesson_order must be a valid number when provided' });
    }

    const affectedRows = await lessonModel.updateLesson(lessonId, {
      module_id: parsedModuleId,
      title: normalizedTitle,
      description,
      content,
      read_time: parsedReadTime,
      lesson_order: parsedLessonOrder,
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
