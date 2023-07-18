const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');

const {
  ok,
  created,
  messageIncorrectMovieData,
  messageMovieNotFound,
  messageNoRights,
  messageInvalidId,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.status(ok).send(cards))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(created).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new BadRequest(messageIncorrectMovieData));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError(messageMovieNotFound);
    })
    .then((movie) => {
      if (String(movie.owner) === req.user._id) {
        movie
          .deleteOne()
          .then(() => res.status(ok).send(movie))
          .catch(next);
      } else {
        throw new Forbidden(messageNoRights);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new BadRequest(messageInvalidId));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
