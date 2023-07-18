const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const {
  ok,
  created,
  messageInvalidUserData,
  messageUserloggedOut,
  messageuserNotFound: messageUserNotFound,
  messageIncorrectUserData,
} = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const Unauthorized = require('../errors/Unauthorized');
const BadRequest = require('../errors/BadRequest');

const createUser = (req, res, next) => {
  bcrypt
    .hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      User.create({
        ...req.body,
        password: hashedPassword,
      })
        .then((user) => res.status(created).send({ data: user }))
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new Unauthorized(messageInvalidUserData))
    .then((user) => {
      bcrypt
        .compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const { NODE_ENV, JWT_SECRET } = process.env;
            const jwt = jsonWebToken.sign(
              {
                _id: user.id,
              },
              NODE_ENV === 'production' ? JWT_SECRET : 'SECRET',
            );
            res.cookie('jwt', jwt, {
              maxAge: 360000,
              httpOnly: true,
              sameSite: true,
            });
            return res.send({ data: user.toJSON() });
          }
          throw new Unauthorized(messageInvalidUserData);
        })
        .catch(next);
    })
    .catch(next);
};

const logout = async (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: messageUserloggedOut });
};
// Запрос на GET /users/me
const userProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user !== null) {
        res.status(ok).send(user);
        return;
      }
      throw new NotFoundError(messageUserNotFound);
    })
    .catch(next);
};
// обновляет информацию о пользователе (email и имя) PATCH /users/me
const updateUser = async (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { name: req.body.name, email: req.body.email },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  )
    .then((user) => res.status(ok).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        next(new BadRequest(messageIncorrectUserData));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  updateUser,
  login,
  logout,
  userProfile,
};
