const path = require('path');
const express = require('express');
const sportRouter = require('./routers/sport.router');
const errorHandler = require('./errorsHandler/errorHandler');
const CONSTANTS = require('./constants');

const app = express();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, CONSTANTS.UPLOAD_FOLDER)));

app.use('/sports', sportRouter);

app.use(errorHandler);

module.exports = app;
