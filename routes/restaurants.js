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
// need requireAuth here once we fix that
restaurantsRouter.get('/:id(\\d+)/reviews/new', csrfProtection, asyncHandler(async (req, res) => {
    const restaurantId = req.params.id
    const restaurant = await db.Restaurant.findByPk(restaurantId);
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

// this throws a 404 error
// need requireAuth here once we fix that
restaurantsRouter.post('/:id(\\d+)/reviews/new', csrfProtection, reviewValidator, asyncHandler(async (req, res) => {
    const {
        review
    } = req.body

    const newReview = db.Review.build({
        userId: req.locals.user.id,
        restaurantId: req.locals.restaurant.id,
        review
    })

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await newReview.save();
        res.redirect('/:id(\\d+)/reviews');
      } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('create-review', {
            title: "Create Review",
            newReview,
            errors,
            csrfToken: req.csrfToken(),
        })
    }
}))

module.exports = restaurantsRouter;
