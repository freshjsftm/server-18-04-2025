const createError = require('http-errors');
const Sport = require('../models/Sport');
const Athlete = require('../models/Athlete');

// розрахувати скільки видів спорту має кожна країна
module.exports.countSportsByCountry = async (req, res, next) => {
  try {
    const data = await Sport.aggregate([
      {
        $lookup: {
          from: 'athletes',
          localField: '_id',
          foreignField: 'sportId',
          as: 'athletes',
        },
      },
      {
        $match: {
          'athletes.0': { $exists: true },
        },
      },
      {
        $unwind: '$athletes',
      },
      {
        $group: {
          _id: { country: '$athletes.country', sport: '$name' },
        },
      },
      {
        $group: {
          _id: '$_id.country',
          amount: {$sum: 1}
        }
      }
    ]);
    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};

// розрахувати середній вік спортсменів по кожному виду спорту
module.exports.getAvgAgeAthletesBySport = async (req, res, next) => {
  try {
    const currentYear = new Date().getFullYear();
    const data = await Athlete.aggregate([
      {
        $group: {
          _id: '$sportId',
          avgAge: {
            $avg: { $subtract: [currentYear, '$birthYear'] },
          },
        },
      },
      {
        $lookup: {
          from: 'sports',
          localField: '_id',
          foreignField: '_id',
          as: 'sport',
        },
      },
      {
        $unwind: '$sport',
      },
      {
        $project: {
          _id: 0,
          sport: '$sport.name',
          avgAge: { $round: ['$avgAge', 1] },
        },
      },
    ]);
    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};

// рахувати спортсменів по кожній країні
module.exports.countAthletesByCountry = async (req, res, next) => {
  try {
    const data = await Athlete.aggregate([
      {
        $group: {
          _id: '$country',
          amount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          country: '$_id',
          amount: 1,
        },
      },
      {
        $sort: { amount: -1 },
      },
    ]);
    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};

// рахували спортсменів по кожному виду спорту
module.exports.countAthletesBySport = async (req, res, next) => {
  try {
    const data = await Sport.aggregate([
      {
        $lookup: {
          from: 'athletes',
          localField: '_id',
          foreignField: 'sportId',
          as: 'athletes',
        },
      },
      {
        $project: {
          _id: 0,
          sport: '$name',
          count: { $size: '$athletes' },
        },
      },
      {
        $sort: { count: 1 },
      },
      {
        $limit: 3,
      },
    ]);
    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};
