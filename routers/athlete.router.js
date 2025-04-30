const express = require('express');
const { createAthlete } = require('../controllers/athlete.controller');
const upload = require('../middlewares/uploadImg');

const athleteRouter = express.Router();

athleteRouter.post('/', upload.single('avatar'), createAthlete);

module.exports = athleteRouter;
