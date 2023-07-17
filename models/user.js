const mongoose = require('mongoose');

const { validatorEmail } = require('../validators/validatorEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Дмитрий',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле email должно быть заполнено'],
    validate: [validatorEmail, 'Введены не коректные данные пользователя'],
  },
  password: {
    type: String,
    required: [true, 'Поле password должно быть заполнено'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
