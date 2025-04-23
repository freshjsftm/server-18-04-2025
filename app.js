const express = require('express');
const sportRouter = require('./routers/sport.router');
const errorHandler = require('./errorsHandler/errorHandler');

const app = express();

app.use(express.json());

app.use('/sports', sportRouter);

app.use(errorHandler);

module.exports = app;
