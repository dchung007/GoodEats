const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const {User, Restaurant, Review, MenuItem} = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const { requireAuth } = require('../auth');

const reviewsRouter = express.Router();

const reviewValidator = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a review')
];

reviewsRouter.get('/',asyncHandler( async (req, res) => {
    console.log('hit / routes');
    res.send("test");


}));



reviewsRouter.get('/edit/:id(\\d+)', csrfProtection,
reviewValidator,
  asyncHandler(async (req, res) => {
    console.log("hit the get route")
    const reviewId = req.params.id;
    console.log(reviewId);
    const review = await db.Review.findByPk(reviewId);
    res.render('review-edit', {
        title: "Edit Review",
        reviewId,
        csrfToken: req.csrfToken(),
    });
}));

reviewsRouter.post('/edit/:id(\\d+)', csrfProtection,
reviewValidator,
  asyncHandler(async (req, res) => {
    console.log("hit the post route");
    const reviewId = req.params.id;
    const review = await db.Review.findByPk(reviewId);


    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      await review.update({review : req.body.review});

      res.redirect('');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('review-edit', {
        title: 'Edit Review',
        review,
        reviewId,
        errors,
        csrfToken: req.csrfToken(),
    });
}
}));




module.exports = reviewsRouter;
