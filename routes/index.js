var express = require('express');
const indexRouter = express.Router();


/* GET home page. */
indexRouter.get('/', function (req, res, next) {
  let loggedInUser;
  if (req.session.auth) {
    console.log(req.session.auth.userId)
    loggedInUser = req.session.auth.userId
  }

  res.render('index', { loggedInUser, title: 'a/A Express Skeleton Home' });
});

module.exports = indexRouter;
