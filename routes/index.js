const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');

const authorizationRoutes = require('./authorization');
const userRoutes = require('./users');
const movieRoutes = require('./movies');

router.use('/', authorizationRoutes);
router.use(auth);
router.use('/', userRoutes);
router.use('/', movieRoutes);
router.use('*', (req, res, next) => {
  const erorNotFound = new NotFoundError('Страница не найдена');
  next(erorNotFound);
});

module.exports = router;
