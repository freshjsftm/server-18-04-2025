const createError = require('http-errors');

module.exports.validateSportBody = (sportSchema) => async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(createError(400, 'empty data'));
    }
    req.body = await sportSchema.validate(req.body);
    next();
  } catch (error) {
    next(createError(400, error.message));
  }
};
