const ok = 200;
const created = 201;
const internalServerError = 500;
const badRequest = 400;
const notFound = 404;
const regularValidetUrl = /^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,})?(?:[/?#]\S*)?$/;
const regularValidetEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const messageInvalidUserData = 'Неверные данные пользователя';
const messageUserloggedOut = 'Пользователь успешно вышел из системы';
const messageUserNotFound = 'Пользователь с таким ID не найден';
const messageIncorrectUserData = 'Переданы некорректные данные пользователя!!!';
const messageIncorrectMovieData = 'Переданы некорректные данные поля фильма!!!';
const messageMovieNotFound = 'Фильм с таким ID не существует';
const messageNoRights = 'Запись принадлежит другому пользователю';
const messageInvalidId = 'Передан не верный формат ID !!!';
const messageUnauthorized = 'Пользователь не авторизован';
const messageEmailExists = 'Пользователь с таким email уже существует';
const messageErrorServer = 'На сервере произошла ошибка';
const mongodb = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  ok,
  created,
  internalServerError,
  badRequest,
  notFound,
  regularValidetUrl,
  regularValidetEmail,
  messageInvalidUserData,
  messageUserloggedOut,
  messageUserNotFound,
  messageIncorrectUserData,
  messageIncorrectMovieData,
  messageMovieNotFound,
  messageNoRights,
  messageInvalidId,
  messageUnauthorized,
  messageEmailExists,
  messageErrorServer,
  mongodb,
};
