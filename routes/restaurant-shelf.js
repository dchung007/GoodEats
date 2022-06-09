const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const { User, Restaurant, Review, MenuItem, RestaurantShelf } = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const { requireAuth } = require('../auth');

const restaurantShelfRouter = express.Router();

restaurantShelfRouter.get('/', asyncHandler(async (req, res) => {
    const restaurants = await db.Restaurant.findAll();

    res.render('restaurant-shelf', {
        title: "Restaurant Shelf",
        restaurants
    })
}))



module.exports = restaurantShelfRouter;
