const express = require('express')
const router = express.Router()
const {User, Restaurant, Review, MenuItem} = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');
const { requireAuth } = require("../auth");



router.delete('/restaurants/:restaurantid(\\d+)/reviews/:id(\\d+)',
    csrfProtection,
    requireAuth,
    asyncHandler(async (req, res) => {
        const reviewId = req.params.id;
        const review = await Review.findByPk(reviewId);

        //delete if review can be found
        if (review){
            await review.destroy();
            res.status(204).end;
        } else{
            next (reviewNotFoundError(reviewId));
        }
}));
