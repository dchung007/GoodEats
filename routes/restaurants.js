const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const {User, Restaurant} = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', (req, res) => {
    res.render('restaurants', {
        title: "Restaurants",
    })
})



module.exports = restaurantsRouter;
