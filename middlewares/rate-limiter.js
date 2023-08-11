const rateLimit = require('express-rate-limit');

function limiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
  });
}

module.exports = limiter;
