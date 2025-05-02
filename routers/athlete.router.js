const express = require('express');
const { createAthlete, findAllAthletes, findAthleteById, updateAthleteById, deleteAthleteById
} = require('../controllers/athlete.controller');
const upload = require('../middlewares/uploadImg');
const { buildAthleteFilter, validateAthlete } = require('../middlewares/athlete.mw');
const {paginate} = require('../middlewares/pagination.mw');
const { athleteSchemaPost , athleteSchemaUpdate} = require('../validations/athlete.validation');

const athleteRouter = express.Router();

athleteRouter.post('/', upload.single('avatar'), validateAthlete(athleteSchemaPost), createAthlete);
athleteRouter.get('/', paginate, buildAthleteFilter, findAllAthletes);
athleteRouter.get('/:idAthlete', findAthleteById);
athleteRouter.patch('/:idAthlete',upload.single('avatar'), validateAthlete(athleteSchemaUpdate), updateAthleteById);
athleteRouter.delete('/:idAthlete', deleteAthleteById)

module.exports = athleteRouter;
