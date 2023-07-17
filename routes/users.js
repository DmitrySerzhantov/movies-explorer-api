const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { updateUser, userProfile } = require('../controllers/users');
const { regularValidetEmail } = require('../utils/constants');

router.get('/users/me', userProfile);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        avatar: Joi.string().required().pattern(regularValidetEmail),
      })
      .unknown(true),
  }),
  updateUser,
);

module.exports = router;
