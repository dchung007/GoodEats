var express = require('express');
const indexRouter = express.Router();
const db = require("../db/models");

/* GET home page. */
indexRouter.get('/', async (req, res, next) => {
  const restaurants = await db.Restaurant.findAll({
    // limit: 2
  });
  let loggedInUser;
  if (req.session.auth) {
    // console.log(req.session.auth.userId)
    loggedInUser = req.session.auth.userId
  }

  res.render('index', { loggedInUser, restaurants, title: 'a/A Express Skeleton Home' });
});


module.exports = indexRouter;
