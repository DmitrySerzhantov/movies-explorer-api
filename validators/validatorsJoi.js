const { celebrate, Joi } = require('celebrate');
const { regularValidetUrl } = require('../utils/constants');
const { regularValidetEmail } = require('../utils/constants');

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regularValidetUrl),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().pattern(regularValidetEmail),
    })
    .unknown(true),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regularValidetUrl),
    trailerLink: Joi.string().required().pattern(regularValidetUrl),
    thumbnail: Joi.string().required().pattern(regularValidetUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
};
