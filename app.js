require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/rate-limiter');
const router = require('./routes');
const { mongodb } = require('./utils/constants');
const errorHandler = require('./middlewares/error');

const { requestLogger, errorLogger } = require('./middlewares/logger');

// Слушаем 3000 порт
const {
  PORT = 3000, URL_DB, NODE_ENV, URL_API,
} = process.env;

const app = express();

app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? URL_DB : mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(helmet());

app.use(cookieParser());
app.use(cors({ origin: URL_API, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(limiter());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, (console.log(PORT)));
