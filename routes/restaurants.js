const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const { User, Restaurant, Review, MenuItem } = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const menuItemsRouter = require('./menuItems')


const { requireAuth } = require('../auth');

const restaurantsRouter = express.Router();
restaurantsRouter.use('/:id(\\d+)/menu-items', menuItemsRouter);

//menu router setup
restaurantsRouter.use('/:id(\\d+)/menu-items', menuItemsRouter);

//middleware: none; all users can see
restaurantsRouter.get('/', asyncHandler(async (req, res) => {
    const restaurants = await db.Restaurant.findAll();
    // console.log('hit / routes')
    // res.send("test")
    res.render('restaurants', {
        title: "Restaurants",
        restaurants
    })
}));

//for get restaurant: all users can view (including unauthorized)
restaurantsRouter.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const restaurantId = req.params.id
    const restaurant = await db.Restaurant.findByPk(restaurantId, {
        include: [
            { model: MenuItem, limit: 2 },
            { model: Review, limit: 2 }
        ],

    });

    res.render('restaurant', {
        title: restaurant.name,
        restaurant,
        restaurantId
    });
}))

// READ operation for reviews
// ALL users can view review; no need to use auth
restaurantsRouter.get('/:id(\\d+)/reviews', asyncHandler(async (req, res) => {
    const restaurantId = req.params.id
    const restaurant = await db.Restaurant.findByPk(restaurantId, {
        include: [Review],
    });


    currentUser = res.locals.user.id;
    console.log (`Current User Is... ${currentUser}`)
    res.render('reviews', {
        title: "Reviews",
        restaurant,
        currentUser
    })
}))

// CREATE operation for reviews
// requireAuth
// but does not require *which* user
restaurantsRouter.get('/:id(\\d+)/reviews/new', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const restaurantId = req.params.id
    const restaurant = await db.Restaurant.findByPk(restaurantId);
    console.log(res.locals.authenticated)
    const review = db.Review.build();
    res.render('create-review', {
        title: "Create Review",
        review,
        restaurant,
        csrfToken: req.csrfToken()
    })
}));


// check if review edists
// need everything associated with auth
const reviewValidator = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a review')
];

restaurantsRouter.post('/:id(\\d+)/reviews/new',
    requireAuth,
    csrfProtection,
    reviewValidator,
    asyncHandler(async (req, res) => {
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
            csrfToken: req.csrfToken()
        });
    };
}));


// ALL users can get reviews
restaurantsRouter.get('/reviews', asyncHandler(async (req, res) => {
    console.log('hit / routes');
    res.send("ReviewsTest");


}));


//=============CREATE A CHECK FUNCTION FOR AUTH=================
const checkPermissions = (review, currentUser) => {
    if (review.userId !== currentUser.id) {
      const err = new Error('Illegal operation.');
      err.status = 403; // Forbidden
      throw err;
    }
  };





//=============EDIT REVIEW===============
//will require auth
//also WILL need to prevent users from getting into the page where review.userId =/= current user id
//
restaurantsRouter.get('/:restaurantid(\\d+)/reviews/edit/:id(\\d+)', csrfProtection,
    requireAuth,
    reviewValidator,
    asyncHandler(async (req, res) => {

        //get params
        const restaurantId = req.params.restaurantid;
        const reviewId = req.params.id;

        //get review and check auth before rendering
        const review = await db.Review.findByPk(reviewId);

        //check permission?
        checkPermissions(review, res.locals.user);





        res.render('review-edit', {
            title: "Edit Review",
            reviewId,
            restaurantId,
            csrfToken: req.csrfToken()
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
        //check permission?
        checkPermissions(review, res.locals.user);




        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
            await review.update({ review: req.body.review });

            res.redirect(`/restaurants/${restaurantId}/reviews`)
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render('review-edit', {
                title: 'Edit Review',
                review,
                reviewId,
                restaurantId,
                csrfToken: req.csrfToken()
            });
        }
    }));


restaurantsRouter.get('/:restaurantid(\\d+)/reviews/delete/:id(\\d+)',
    requireAuth,
    csrfProtection,
    asyncHandler(async (req, res) => {
        const reviewId = req.params.id;
        // const restaurantId = req.params.restaurantid;

        const review = await db.Review.findByPk(reviewId);

        //check permission?
        checkPermissions(review, res.locals.user);



        res.render('review-delete', {
            title: "Delete Review",
            review,
            csrfToken: req.csrfToken()
        })



    }));

restaurantsRouter.post('/:restaurantid(\\d+)/reviews/delete/:id(\\d+)',
    requireAuth,
    csrfProtection,
    asyncHandler(async (req, res) => {
        const restaurantId = req.params.restaurantid;
        const reviewId = req.params.id;
        const review = await Review.findByPk(reviewId);
        //check permission?
        checkPermissions(review, res.locals.user);

        //delete if review can be found
        await review.destroy();
        res.redirect(`/restaurants/${restaurantId}/reviews`)
    }));







// restaurantsRouter.get('/:id(\\d+)', async (req, res) => {
//     res.send('test')
// })

module.exports = restaurantsRouter;
