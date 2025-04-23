const createError = require('http-errors');
const Sport = require('../models/Sport');
const CONSTANTS = require('../constants');

module.exports.createSport = async (req, res, next) => {
  try {
    const image = req.file
      ? `/${CONSTANTS.UPLOAD_FOLDER}${req.file.filename}`
      : null;
    const body = { ...req.body, image };
    const newSport = await Sport.create(body);
    res.status(201).send({ data: newSport });
  } catch (error) {
    next(createError(400, error.message));
  }
};
