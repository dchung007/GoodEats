const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const {User, Restaurant, Review, MenuItem} = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const { requireAuth } = require('../auth');

const restaurantsRouter = express.Router();


restaurantsRouter.get('/',asyncHandler( async (req, res) => {
    const restaurants = await db.Restaurant.findAll();
    // console.log('hit / routes')
    // res.send("test")
    res.render('restaurants', {
        title: "Restaurants",
        restaurants
    })
}));

restaurantsRouter.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const restaurantId = req.params.id
    const restaurant = await db.Restaurant.findByPk(restaurantId, {
        include: [MenuItem, Review],

    });
    console.log(restaurant);
    res.render('restaurant', {
        title: restaurant.name,
        restaurant,
        restaurantId
    });
}))

// READ operation for reviews
restaurantsRouter.get('/:id(\\d+)/reviews', asyncHandler(async (req, res) => {
    const restaurantId = req.params.id
    const restaurant = await db.Restaurant.findByPk(restaurantId, {
        include: [Review],
    });
    res.render('reviews', {
        title: "Reviews",
        restaurant
    })
}))

// CREATE operation for reviews
restaurantsRouter.get('/:id(\\d+)/reviews/new', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const restaurantId = req.params.id
    const restaurant = await db.Restaurant.findByPk(restaurantId);
    console.log(res.locals.authenticated)
    const review = db.Review.build();
    res.render('create-review', {
        title: "Create Review",
        review,
        restaurant,
        csrfToken: req.csrfToken(),
    })
}));

const reviewValidator = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a review')
];

restaurantsRouter.post('/:id(\\d+)/reviews/new', requireAuth, csrfProtection, reviewValidator, asyncHandler(async (req, res) => {
    const restaurantId = req.params.id
    const {
        review
    } = req.body

    const newReview = db.Review.build({
        userId: req.session.auth.userId,
        restaurantId,
        review
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await newReview.save();
        return res.redirect(`/restaurants/${restaurantId}/reviews`);
      } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('create-review', {
            title: "Create Review",
            newReview,
            errors,
            csrfToken: req.csrfToken(),
        });
    };
}));



restaurantsRouter.get('/reviews',asyncHandler( async (req, res) => {
    console.log('hit / routes');
    res.send("ReviewsTest");


}));



restaurantsRouter.get('/:restaurantid(\\d+)/reviews/edit/:id(\\d+)', csrfProtection,
    requireAuth,
    reviewValidator,
    asyncHandler(async (req, res) => {
        console.log("hit the get route")
        const restaurantId = req.params.restaurantid;
        const reviewId = req.params.id;
        console.log(reviewId);
        const review = await db.Review.findByPk(reviewId);
        res.render('review-edit', {
            title: "Edit Review",
            reviewId,
            restaurantId,
            csrfToken: req.csrfToken(),
        });
}));

restaurantsRouter.post('/:restaurantid(\\d+)/reviews/edit/:id(\\d+)', csrfProtection,
    requireAuth,
    reviewValidator,
    asyncHandler(async (req, res) => {
        console.log("hit the post route");
        const restaurantId = req.params.restaurantid;
        const reviewId = req.params.id;
        const review = await db.Review.findByPk(reviewId);


        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
        await review.update({review : req.body.review});

        res.redirect(`/restaurants/${restaurantId}/reviews`)
        } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('review-edit', {
            title: 'Edit Review',
            review,
            reviewId,
            restaurantId,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));


restaurantsRouter.get('/:restaurantid(\\d+)/reviews/delete/:id(\\d+)', requireAuth,
asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    // const restaurantId = req.params.restaurantid;
    const review = await db.Review.findByPk(reviewId);

    res.render('review-delete', {
        title: "Delete Review",
        review,
    })



}));

restaurantsRouter.post('/:restaurantid(\\d+)/reviews/delete/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const restaurantId = req.params.restaurantid;
        const reviewId = req.params.id;
        const review = await Review.findByPk(reviewId);

        //delete if review can be found
        await review.destroy();
        res.redirect(`/restaurants/${restaurantId}/reviews`
        )
}));






module.exports = restaurantsRouter;
