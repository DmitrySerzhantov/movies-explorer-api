const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');

const { ok, created } = require('../utils/constants');

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
        next(new BadRequest('Переданы некорректные данные поля карточки!!!'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка с таким ID не существует');
    })
    .then((card) => {
      if (String(card.owner) === req.user._id) {
        card
          .deleteOne()
          .then(() => res.status(ok).send(card))
          .catch(next);
      } else {
        throw new Forbidden('Карточка принадлежит другому пользователю');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new BadRequest('Передан не верный формат ID !!!'));
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
