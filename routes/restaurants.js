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
restaurantsRouter.get('/:id(\\d+)/reviews/new', requireAuth, csrfProtection, (req, res) => {
    // const review = db.Review.build();
    // res.render('create-review', {
    //     title: "Create Review",
    //     review,
    //     csrfToken: req.csrfToken(),
    // })
});

// const reviewValidator = [
//     check('review')
//         .exists({ checkFalsy: true })
//         .withMessage('Please provide a review')
// ];

// restaurantsRouter.post('/:id(\\d+)/reviews/new', requireAuth, csrfProtection, reviewValidator, asyncHandler(async (req, res) => {
//     const {
//         userId,
//         restaurantId,
//         review,
//     } = req.body

//     const newReview = await db.Review.create({
//         userId: req.user.id,
//         restaurantId: req.restaurant.id,
//         review
//     })

//     const validatorErrors = validationResult(req);

//     if (validatorErrors.isEmpty()) {
//         res.redirect('/:id(\\d+)/reviews');
//       } else {
//         const errors = validatorErrors.array().map((error) => error.msg);
//         res.render('create-review', {
//             title: "Create Review",
//             review,
//             errors,
//             csrfToken: req.csrfToken(),
//         })
//     }
// }))

module.exports = restaurantsRouter;
