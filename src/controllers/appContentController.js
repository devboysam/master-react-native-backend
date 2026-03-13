const appContentModel = require('../models/appContentModel');

async function getAppContent(req, res, next) {
  try {
    const content = await appContentModel.getAppContent();
    return res.json({ success: true, data: content });
  } catch (error) {
    return next(error);
  }
}

async function updateAppContent(req, res, next) {
  try {
    const { welcome_title, welcome_description, motivation_text, motivation_quote } = req.body;

    if (!welcome_title || !welcome_description || !motivation_text || !motivation_quote) {
      return res.status(400).json({
        success: false,
        message: 'welcome_title, welcome_description, motivation_text, and motivation_quote are required',
      });
    }

    const updated = await appContentModel.updateAppContent({
      welcome_title,
      welcome_description,
      motivation_text,
      motivation_quote,
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAppContent,
  updateAppContent,
};
