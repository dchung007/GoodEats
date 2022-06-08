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
  // Modifciation below
  let loggedInUser
  if (req.session.auth) {
    console.log(req.session.auth.userId)
    loggedInUser = req.session.auth.userId
  }
  res.render('menu-items', { restaurant, loggedInUser })
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
  const restaurant = await db.Restaurant.findByPk(restaurantId, {
    include: [MenuItem],
  });
  res.render('menu-items', { restaurant })
}))


menuItemsRouter.put('/:id(\\d+)', async (req, res) => {
  console.log(req.body)
  const item = await MenuItem.findByPk(req.params.id)
  item.name = req.body.name
  item.description = req.body.description
  await item.save()

  res.json({ message: 'New item added!', item })
})
module.exports = menuItemsRouter;
