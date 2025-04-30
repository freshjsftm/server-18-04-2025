const createError = require('http-errors');
const Sport = require('../models/Sport');
const Athlete = require('../models/Athlete');
const CONSTANTS = require('../constants');

module.exports.createAthlete = async (req, res, next) => {
  try {
    const { name, country, birthYear } = req.body;
    const { idSport } = req.params;
    console.log(idSport)
    const sport = await Sport.findById(idSport);
    if (!sport) {
      return next(createError(404, 'Sport not found'));
    }
    const avatar = req.file
      ? `/${CONSTANTS.UPLOAD_FOLDER}${req.file.filename}`
      : null;
    const newAthlete = await Athlete.create({
      name, country, birthYear, sportId: idSport, avatar
    });
    res.status(201).send({ data: newAthlete });
  } catch (error) {
    next(createError(400, error.message));
  }
};
