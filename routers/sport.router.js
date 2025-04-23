const express = require('express');
const { createSport } = require('../controllers/sport.controller');
const upload = require('../middlewares/uploadImg');
const { validateSportBody } = require('../middlewares/sport.mw');
const { sportSchemaCreate } = require('../validations/sport.validation');

const sportRouter = express.Router();

sportRouter.post(
  '/',
  validateSportBody(sportSchemaCreate),
  upload.single('image'),
  createSport
);

module.exports = sportRouter;
