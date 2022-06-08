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

reviewsRouter.get('/:id(\\d+)',asyncHandler( async (req, res) => {
    // console.log('hit / routes')
    // res.send("test")
    const reviewId = req.params.id;
    console.log(reviewId);
    const review = await db.Review.findByPk(reviewId);
    res.send(review);

}));



reviewsRouter.get('/edit/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    console.log(reviewId);
    const review = await db.Review.findByPk(reviewId);
    res.render('review-edit', {
        title: "Edit Review",
        review,
        // csrfToken: req.csrfToken(),
    });
}));

reviewsRouter.post('/edit/:id(\\d+)', reviewValidator,
  asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    const reviewToUpdate = await db.Review.findByPk(reviewId);

    const {
        review
    } = req.body


    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await reviewToUpdate.update(review);
      res.redirect('/:id(\\d+)');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('review-edit', {
        title: 'Edit Review',
        review: { ...review, id: reviewId },
        errors,
        // csrfToken: req.csrfToken(),
    });
}
}));




module.exports = reviewsRouter;
