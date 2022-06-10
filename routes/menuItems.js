const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const { User, Restaurant, MenuItem } = db;
const { asyncHandler, csrf, csrfProtection, cookieParser } = require('./utils');


const { signInUser, requireAuth } = require('../auth');

const menuItemsRouter = express.Router();
menuItemsRouter.use(cookieParser());
menuItemsRouter.use(express.urlencoded({ extended: false }));

const bcrypt = require('bcryptjs');
const csurf = require('csurf');




const itemValidators = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Item Name'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Item Description')
]

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
  let owner
  console.log(req.session)
  if (req.session.auth) {
    loggedInUser = req.session.auth.userId
  }
  owner = restaurant.ownerId
  console.log(owner)
  console.log(loggedInUser)
  res.render('menu-items', { restaurant, loggedInUser, csrfToken: req.csrfToken(), owner })
}))

// --------------
const checkPermissions = (owner, currentUser) => {
  if (owner !== currentUser) {
    const err = new Error('Illegal operation.');
    err.status = 403; // Forbidden
    throw err;
  }
};

menuItemsRouter.get('/new', csrfProtection, asyncHandler(async (req, res) => {

  const path = req.baseUrl.split('/')
  // console.log(path[2])
  const restaurantId = path[2];
  const restaurant = await db.Restaurant.findByPk(restaurantId, {
    include: [MenuItem],
  });
  // console.log(restaurant)
  // Modifciation below
  let loggedInUser
  let owner = restaurant.ownerId
  console.log(req.session)
  if (req.session.auth) {
    console.log(req.session.auth.userId)
    loggedInUser = req.session.auth.userId
  }
  checkPermissions(loggedInUser, owner)
  res.render('new-menu-item', { restaurant, loggedInUser, csrfToken: req.csrfToken() })
}))

menuItemsRouter.post('/', itemValidators, csrfProtection, asyncHandler(async (req, res) => {
  const path = req.baseUrl.split('/')
  const restaurantId = path[2];
  const {
    name,
    description
  } = req.body

  const newMenuItem = await MenuItem.build({
    // userId: req.session.auth.userId,
    name,
    description,
    restaurantId,
    image: 'https://downtownls.org/wp-content/uploads/coming-soon.jpg'
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await newMenuItem.save();
    return res.redirect(`/restaurants/${restaurantId}/menu-items`);
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('new-menu-item', {
      title: "New Menu Item",
      newMenuItem,
      errors,
      csrfToken: req.csrfToken(),
    });
  };
}));

// menuItemsRouter.post('/',  itemValidators, csrfProtection, asyncHandler(async (req, res) => {
//   const path = req.baseUrl.split('/')
//   const restaurantId = path[2];
//   const { name, description } = req.body
//   const validatorErrors = validationResult(req);
//   const restaurant = await db.Restaurant.findByPk(restaurantId, {
//     include: [MenuItem],
//   });
//   // const item = await MenuItem.findOne({where: {name}})
//   // console.log('test---------------', item.dataValues.name.includes(name))
//   // if (!item.dataValues.name.includes(name) || item.dataValues.name === undefined) {
//     if (!validatorErrors.isEmpty()) {
//       const errors = validatorErrors.array().map((error) => error.msg);
//       res.render('menu-items', {
//         name,
//         description,
//         errors,
//         restaurant,
//         csrfToken: req.csrfToken()
//         })
//     } else {
//         const menuItem = await MenuItem.create({
//           name,
//           description,
//           restaurantId,
//         })

//         res.render('menu-items', { restaurant, csrfToken: req.csrfToken() })
//       }
//     // } else {console.log('That failed')}
// }))


menuItemsRouter.put('/:id(\\d+)', async (req, res) => {
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
