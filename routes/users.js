const router = require('express').Router();

const { updateUser, userProfile } = require('../controllers/users');

const { updateUserValidation } = require('../validators/validatorsJoi');

router.get('/users/me', userProfile);

router.patch('/users/me', updateUserValidation, updateUser);

module.exports = router;
