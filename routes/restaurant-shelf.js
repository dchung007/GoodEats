const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const { User, Restaurant, Review, MenuItem, RestaurantShelf } = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const { requireAuth } = require('../auth');

const restaurantShelfRouter = express.Router();

restaurantShelfRouter.get('/', asyncHandler(async (req, res) => {
    const shelfs = await db.RestaurantShelf.findAll();

    res.render('restaurant-shelf', {
        title: "Restaurant Shelf",
        shelfs
    })
}))
