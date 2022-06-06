const express = require('express');
const { check, validationResult } = require('express-validator');


const db = require('../db/fillThisIn') // ****
const { csrfProtection, asyncHandler } = require('./utils');

const { signInUser } = require('../auth');

const router = express.Router();

const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users/register', csrfProtection, asyncHandler ( async (req, res) => {
  const user = db.fillThisIn.build(); // ***
  const restaurants = await db.fillThisIn.findAll();
  res.render('create-account', {
    title: "Create Account",
    user,
    csrfToken: req.csrfToken(),
    restaurants
  });
}));

const userValidators = [
  check('username')
    .exists({ checkFalsy: true})
    .withMessage('Please provide a username')
    .isLength({ max: 100 })
    .withMessage('Username cannot exceed 100 characters')
    .custom((value) => {
      return db.fillThisIn.findOne({ where: { username: value } }) // ***
        .then((user) => {
          if (user) {
            return Promise.reject('The provided username is already being used by another user.')
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true})
    .withMessage('Please provide a password'),
  check('restaurantOwnerId')
    .exists({ checkFalsy: true})
    .withMessage("If you are a restaurant owner, please select the restaurant that you own, if not please select 'not an owner'")
]

router.post('users/register', csrfProtection, asyncHandler(async (req, res) => {
  const {
    username,
    password,
    restaurantOwnerId, // 1 = not owning restaurant, anything > 1 => own restaurant
  } = req.body

  const user = db.fillThisIn.build({ // ***
    username,
    password,
    restaurantOwnerId
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    signInUser(req, res, user); // auth function
    res.redirect('/home');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('create-account', {
      title: 'Create Account',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));


module.exports = router;
