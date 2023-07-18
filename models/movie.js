const mongoose = require('mongoose');
const { validatorURL } = require('../validators/validatorURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [validatorURL, '{PATH} Не верная ссылка'],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [validatorURL, '{PATH} Не верная ссылка'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [validatorURL, '{PATH} Не верная ссылка'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
