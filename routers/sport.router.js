const express = require('express');
const { createSport } = require('../controllers/sport.controller');
const upload = require('../middlewares/uploadImg');

const sportRouter = express.Router();

sportRouter.post('/', upload.single('image'), createSport);

module.exports = sportRouter;
