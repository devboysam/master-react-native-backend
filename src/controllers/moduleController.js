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
    const { title, description, prerequisites, icon, order_index } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'title is required',
      });
    }

    const newModule = await moduleModel.createModule({
      title,
      description,
      prerequisites,
      icon,
      order_index,
    });

    return res.status(201).json({ success: true, data: newModule });
  } catch (error) {
    return next(error);
  }
}

async function getModuleById(req, res, next) {
  try {
    const moduleId = Number(req.params.id);

    if (Number.isNaN(moduleId)) {
      return res.status(400).json({ success: false, message: 'Invalid module id' });
    }

    const moduleItem = await moduleModel.getModuleById(moduleId);

    if (!moduleItem) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

    return res.json({ success: true, data: moduleItem });
  } catch (error) {
    return next(error);
  }
}

async function updateModule(req, res, next) {
  try {
    const moduleId = Number(req.params.id);
    const { title, description, prerequisites, icon, order_index } = req.body;

    if (Number.isNaN(moduleId)) {
      return res.status(400).json({ success: false, message: 'Invalid module id' });
    }

    if (!title) {
      return res.status(400).json({ success: false, message: 'title is required' });
    }

    const affectedRows = await moduleModel.updateModule(moduleId, {
      title,
      description,
      prerequisites,
      icon,
      order_index,
    });

    if (!affectedRows) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

    const updated = await moduleModel.getModuleById(moduleId);
    return res.json({ success: true, data: updated });
  } catch (error) {
    return next(error);
  }
}

async function deleteModule(req, res, next) {
  try {
    const moduleId = Number(req.params.id);

    if (Number.isNaN(moduleId)) {
      return res.status(400).json({ success: false, message: 'Invalid module id' });
    }

    const affectedRows = await moduleModel.deleteModule(moduleId);

    if (!affectedRows) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

    return res.json({ success: true, message: 'Module deleted' });
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
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
  getModuleLessons,
};
