require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes');
const { limiter } = require('./middlewares/rate-limiter');

const errorHandler = require('./middlewares/error');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { URL_BD } = process.env;

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.use(limiter);

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cookieParser());
app.use(cors({ origin: URL_BD, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
