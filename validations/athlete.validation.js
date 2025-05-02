const yup = require('yup');
const CONSTANTS = require('../constants');

const athleteSchemaPost = yup.object({
  name: yup.string().trim().min(6).max(255).required(),
  country: yup.string().trim().oneOf(CONSTANTS.COUNTRIES).required(),
  birthYear: yup
    .number()
    .min(1900)
    .max(new Date().getFullYear() - 15)
    .required(),
  sportId: yup.string().required(),
});

const athleteSchemaUpdate = yup.object({
  name: yup.string().trim().min(6).max(255),
  country: yup.string().trim().oneOf(CONSTANTS.COUNTRIES),
  birthYear: yup
    .number()
    .min(1900)
    .max(new Date().getFullYear() - 15),
  sportId: yup.string(),
});

module.exports = { athleteSchemaPost, athleteSchemaUpdate };
