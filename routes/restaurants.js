const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const { User, Restaurant, Review, MenuItem } = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const menuItemsRouter = require('./menuItems')
// const reviews = require('./routes/reviews');

const restaurantsRouter = express.Router();

// restaurantsRouter.use('/:id(\\d+)/reviews', reviewsRouter);
restaurantsRouter.use('/:id(\\d+)/menu-items', menuItemsRouter);

// console.log("hit restaurants router")
restaurantsRouter.get('/', asyncHandler(async (req, res) => {
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



module.exports = restaurantsRouter;
