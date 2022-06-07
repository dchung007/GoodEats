var express = require('express');
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
res.render('index', { title: 'a/A Express Skeleton Home' });
});

module.exports = indexRouter;
