const fs = require('fs/promises');
const path = require('path');
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

module.exports.getAllSports = async (req, res, next) => {
  try {
    const { limit, skip } = req.pagination;
    const sports = await Sport.find(req.filter).skip(skip).limit(limit);
    res.status(200).send({ data: sports });
  } catch (error) {
    next(error);
  }
};

module.exports.getSportById = async (req, res, next) => {
  try {
    const { idSport } = req.params;
    const sport = await Sport.findById(idSport).populate('athletes');
    if (!sport) {
      return next(createError(404, 'sport not found'));
    }
    res.status(200).send({ data: { sport } });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.updateSportById = async (req, res, next) => {
  try {
    const { idSport } = req.params;
    const { name, isOlimpic } = req.body;
    const sport = await Sport.findById(idSport);
    if (!sport) {
      return next(createError(404, 'sport not found'));
    }
    if (req.file) {
      if (sport.image) {
        const imagePath = path.join(__dirname, '..', sport.image);
        await fs.unlink(imagePath);
      }
      sport.image = `/${CONSTANTS.UPLOAD_FOLDER}${req.file.filename}`;
    }
    sport.name = name || sport.name;
    sport.isOlimpic = isOlimpic || sport.isOlimpic;
    const updatedSport = await sport.save();
    res.status(200).send({ data: updatedSport });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.deleteSportById = async (req, res, next) => {
  try {
    const { idSport } = req.params;
    const deletedSport = await Sport.findByIdAndDelete(idSport);
    if (!deletedSport) {
      return next(createError(404, 'sport not found'));
    }
    if (deletedSport.image) {
      const imagePath = path.join(__dirname, '..', deletedSport.image);
      await fs.unlink(imagePath);
    }
    res.status(200).send({ data: deletedSport });
  } catch (error) {
    next(createError(400, error.message));
  }
};
