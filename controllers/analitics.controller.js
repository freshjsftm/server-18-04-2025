const createError = require('http-errors');
const Sport = require('../models/Sport');
const Athlete = require('../models/Athlete');

module.exports.countAthletesBySport = async (req, res, next) => {
  try {
    const data = await Sport.aggregate([
      {
        $lookup:{
          from: 'athletes',
          localField: '_id',
          foreignField: 'sportId',
          as: 'athletes'
        }
      },
      {
        $project: {
          _id: 0,
          sport: '$name',
          count: { $size: '$athletes'}
        }
      },
      {
        $sort: { count: 1}
      },
      {
        $limit: 3
      }
    ]);
    res.status(200).send({ data });
  } catch (error) {
    next(error);
  }
};
