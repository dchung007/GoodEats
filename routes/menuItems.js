const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const { User, Restaurant, MenuItem } = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const { signInUser } = require('../auth');

const menuItemsRouter = express.Router();

const bcrypt = require('bcryptjs');

menuItemsRouter.get('/', asyncHandler(async (req, res) => {
  const path = req.baseUrl.split('/')
  // console.log(path[2])
  const restaurantId = path[2];
  const restaurant = await db.Restaurant.findByPk(restaurantId, {
    include: [MenuItem],
  });
  // console.log(restaurant)
  res.render('menu-items', { restaurant })
}))

menuItemsRouter.post('/', asyncHandler(async (req, res) => {
  const path = req.baseUrl.split('/')
  // console.log(path[2])
  const restaurantId = path[2];
  // console.log(req.body)
  const { name, description } = req.body
  // console.log(description)
  const menuItem = await MenuItem.create({
    name,
    description,
    restaurantId
  })
  res.send('Item was created successfully.')
}))

module.exports = menuItemsRouter;
