const {
  messageEmailExists,
  messageErrorServer,
} = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.code === 11000) {
    res.status(409).send({ message: messageEmailExists });
    return;
  }
  res.status(err.statusCode || statusCode).send({
    message: statusCode === 500 ? messageErrorServer : message,
  });
  next();
};

module.exports = errorHandler;
