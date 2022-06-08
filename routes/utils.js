const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });
const cookieParser = require('cookie-parser');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

module.exports = {
  csrfProtection,
  asyncHandler,
  csrf,
  cookieParser
};
