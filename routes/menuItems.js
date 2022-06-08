const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const { User, Restaurant, MenuItem } = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const { signInUser } = require('../auth');

const menuItemsRouter = express.Router();

const bcrypt = require('bcryptjs');

menuItemsRouter.get('/', csrfProtection, asyncHandler(async (req, res) => {
  const path = req.baseUrl.split('/')
  // console.log(path[2])
  const restaurantId = path[2];
  const restaurant = await db.Restaurant.findByPk(restaurantId, {
    include: [MenuItem],
  });
  // console.log(restaurant)
  // Modifciation below
  let loggedInUser
  console.log(req.session)
  if (req.session.auth) {
    console.log(req.session.auth.userId)
    loggedInUser = req.session.auth.userId
  }
  res.render('menu-items', { restaurant, loggedInUser, csrfToken: req.csrfToken() })
}))

const itemValidators = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Item Name'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Item Name')
]
menuItemsRouter.post('/', csrfProtection, itemValidators, asyncHandler(async (req, res) => {
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
  res.render('menu-items', { restaurant, csrfToken: req.csrfToken() })
}))


menuItemsRouter.put('/:id(\\d+)', async (req, res) => {
  console.log(req.body)
  const item = await MenuItem.findByPk(req.params.id)
  item.name = req.body.name
  item.description = req.body.description
  await item.save()

  res.json({ message: 'New item added!', item })
})

menuItemsRouter.delete('/:id(\\d+)', async (req, res) => {
  const item = await MenuItem.findByPk(req.params.id)
  await item.destroy()

  res.json({ message: 'Item deleted.' })
})

module.exports = menuItemsRouter;
