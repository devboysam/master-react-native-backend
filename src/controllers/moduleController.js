const moduleModel = require('../models/moduleModel');
const lessonModel = require('../models/lessonModel');

function normalizeHexColor(value) {
  const color = String(value || '').trim();
  if (!color) {
    return '#EAF2FF';
  }

  const normalized = color.startsWith('#') ? color : `#${color}`;
  if (!/^#[0-9A-Fa-f]{6}$/.test(normalized)) {
    return null;
  }

  return normalized.toUpperCase();
}

function normalizeImageUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return null;
  }

  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return undefined;
    }
    return parsed.toString();
  } catch {
    return undefined;
  }
}

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
    const { title, description, prerequisites, icon, image_url, background_color, order_index } = req.body;
    const normalizedTitle = String(title || '').trim();

    if (!normalizedTitle) {
      return res.status(400).json({
        success: false,
        message: 'title is required',
      });
    }

    const normalizedBgColor = normalizeHexColor(background_color);
    if (!normalizedBgColor) {
      return res.status(400).json({
        success: false,
        message: 'background_color must be a valid 6-digit hex code (example: #EAF2FF)',
      });
    }

    const normalizedImageUrl = normalizeImageUrl(image_url);
    if (normalizedImageUrl === undefined) {
      return res.status(400).json({
        success: false,
        message: 'image_url must be a valid http or https URL',
      });
    }

    const newModule = await moduleModel.createModule({
      title: normalizedTitle,
      description,
      prerequisites,
      icon,
      image_url: normalizedImageUrl,
      background_color: normalizedBgColor,
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
    const { title, description, prerequisites, icon, image_url, background_color, order_index } = req.body;
    const normalizedTitle = String(title || '').trim();

    if (Number.isNaN(moduleId)) {
      return res.status(400).json({ success: false, message: 'Invalid module id' });
    }

    if (!normalizedTitle) {
      return res.status(400).json({ success: false, message: 'title is required' });
    }

    const normalizedBgColor = normalizeHexColor(background_color);
    if (!normalizedBgColor) {
      return res.status(400).json({
        success: false,
        message: 'background_color must be a valid 6-digit hex code (example: #EAF2FF)',
      });
    }

    const normalizedImageUrl = normalizeImageUrl(image_url);
    if (normalizedImageUrl === undefined) {
      return res.status(400).json({
        success: false,
        message: 'image_url must be a valid http or https URL',
      });
    }

    const affectedRows = await moduleModel.updateModule(moduleId, {
      title: normalizedTitle,
      description,
      prerequisites,
      icon,
      image_url: normalizedImageUrl,
      background_color: normalizedBgColor,
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
