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

// this throws a 404 error
restaurantsRouter.post('/:id(\\d+)/reviews/new', requireAuth, csrfProtection, reviewValidator, asyncHandler(async (req, res) => {
    const {
        review
    } = req.body

    const newReview = db.Review.build({
        userId: req.locals.user.id,
        restaurantId: req.locals.restaurant.id,
        review
    });

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
        });
    };
}));






//review

//will require
//requireauth
//require csrfToken
// restaurantsRouter.get('/reviews/edit/:id(\\d+)',
//   asyncHandler(async (req, res) => {
//     const reviewId = req.params.id;
//     console.log(reviewId);
//     const review = await db.Review.findByPk(reviewId);
//     res.render('review-edit', {
//         review,
//         // csrfToken: req.csrfToken(),
//     });
// }));



//need csrf
// restaurantsRouter.post('/reviews/edit/:id(\\d+)', reviewValidator,
//   asyncHandler(async (req, res) => {
//     const reviewId = req.params.id;
//     const reviewToUpdate = await db.Review.findByPk(reviewId);

//     const {
//         review
//     } = req.body


//     const validatorErrors = validationResult(req);

//     if (validatorErrors.isEmpty()) {
//       await reviewToUpdate.update(review);
//       res.redirect('/:id(\\d+)/reviews/:reviewid(\\d+)');
//     } else {
//       const errors = validatorErrors.array().map((error) => error.msg);
//       res.render('review-edit', {
//         title: 'Edit Review',
//         review: { ...review, id: reviewId },
//         errors,
//         // csrfToken: req.csrfToken(),
//     });
// }
// }));





module.exports = restaurantsRouter;
