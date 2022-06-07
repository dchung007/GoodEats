const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const {User, Restaurant} = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

// const menuItemsRouter= require('./routes/menuItems')
// const reviews = require('./routes/reviews');

const restaurantsRouter = express.Router();

// restaurantsRouter.use('/reviews', reviewsRouter);
// restaurantsRouter.use('/menuItems',menuItemsRouter);

console.log("hit restaurants router")
restaurantsRouter.get('/',asyncHandler( async (req, res) => {
    const restaurants = await db.Restaurant.findAll();
    // console.log('hit / routes')
    // res.send("test")
    res.render('restaurants', {
        title: "Restaurants",
        restaurants
    })
}));


module.exports = restaurantsRouter;
