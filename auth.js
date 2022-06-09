const db = require('./db/models');

const signInUser = async (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

const signOutUser = async (req, res) => {
  delete req.session.auth;
  res.clearCookie('good-eats.sid');
  res.clearCookie('_csrf');
};

const requireAuth = async (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/register');
  }
  return next();
};



const restoreUser = async (req, res, next) => {
  console.log(req.session);

  if (req.session.auth) {
    const { userId } = req.session.auth;

    try {
      const user = await db.User.findByPk(userId);

      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
};

module.exports = {
  signInUser,
  signOutUser,
  restoreUser,
  requireAuth,

};
