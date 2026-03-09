const moduleModel = require('../models/moduleModel');
const lessonModel = require('../models/lessonModel');

async function getModules(req, res, next) {
  try {
    const modules = await moduleModel.getAllModules();
    return res.json({ success: true, data: modules });
  } catch (error) {
    return next(error);
  }
}

async function createModule(req, res, next) {
  try {
    const { title, description, icon, order_index } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'title is required',
      });
    }

    const newModule = await moduleModel.createModule({
      title,
      description,
      icon,
      order_index,
    });

    return res.status(201).json({ success: true, data: newModule });
  } catch (error) {
    return next(error);
  }
}

async function getModuleLessons(req, res, next) {
  try {
    const moduleId = Number(req.params.id);

    if (Number.isNaN(moduleId)) {
      return res.status(400).json({ success: false, message: 'Invalid module id' });
    }

    const lessons = await lessonModel.getLessonsByModuleId(moduleId);
    return res.json({ success: true, data: lessons });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getModules,
  createModule,
  getModuleLessons,
};
