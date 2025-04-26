const express = require('express');
const { createSport, getAllSports, getSportById, deleteSportById, updateSportById } = require('../controllers/sport.controller');
const upload = require('../middlewares/uploadImg');
const { validateSportBody, buildSportFilter } = require('../middlewares/sport.mw');
const { sportSchemaCreate, sportSchemaUpdate } = require('../validations/sport.validation');
const { paginate } = require('../middlewares/pagination.mw');

const sportRouter = express.Router();

sportRouter.post( '/', upload.single('image'), validateSportBody(sportSchemaCreate),  createSport );
sportRouter.get('/',paginate, buildSportFilter, getAllSports);
sportRouter.get('/:idSport', getSportById);
sportRouter.patch('/:idSport', upload.single('image'), validateSportBody(sportSchemaUpdate), updateSportById);
sportRouter.delete('/:idSport', deleteSportById);

module.exports = sportRouter;
