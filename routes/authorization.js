const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const {
  signupValidation,
  signinValidation,
} = require('../validators/validatorsJoi');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);
router.post('/logout', logout);

module.exports = router;
