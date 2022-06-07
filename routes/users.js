const express = require('express');
const { check, validationResult } = require('express-validator');
const indexRouter = require('./index.js')

const db = require('../db/models');
const { User, Restaurant } = db;
const { csrfProtection, asyncHandler } = require('./utils');

const { signInUser, signOutUser } = require('../auth');

const router = express.Router();

const bcrypt = require('bcryptjs');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/register', csrfProtection, asyncHandler(async (req, res) => {
  const user = db.User.build();
  res.render('create-account', {
    title: "Create Account",
    user,
    csrfToken: req.csrfToken(),
  });
}));

const userValidators = [
  check('username')
    .exists({ checkFalsy: true})
    .withMessage('Please provide a username')
    .isLength({ max: 100 })
    .withMessage('Username cannot exceed 100 characters'),
    // .custom((value) => {
    //   return db.User.findOne({ where: { username: value } })
    //     .then((user) => {
    //       if (user) {
    //         return Promise.reject('The provided username is already being used by another user.')
    //       }
    //     });
    // }),
  check('password')
    .exists({ checkFalsy: true})
    .withMessage('Please provide a password'),
  // check('restaurantOwnerId')
  //   .exists({ checkFalsy: true})
  //   .withMessage("If you are a restaurant owner, please select the restaurant that you own, if not please select 'not an owner'")
]

const signInValidators = [
  check('username')
    .exists({checkFalsy: true})
    .withMessage('Please enter a valid username'),
  check('password')
    .exists({checkFalsy: true})
    .withMessage('Please enter a password')
]

router.post('/register', userValidators, csrfProtection, asyncHandler(async (req, res) => {
  const {
    username,
    password,
  } = req.body
  console.log(req.body)
  const validatorErrors = validationResult(req);
  //res.redirect('/')
  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    //user.hashedPassword = hashedPassword;
    console.log('test')
    const user = await User.create({ // ***
      username,
      password: hashedPassword,
    })
    signInUser(req, res, user); // auth function
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('create-account', {
      title: 'Create Account',
      username,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

router.get('/sign-in', csrfProtection, (req, res) => {
  res.render('sign-in', {
    title: "Sign In",
    csrfToken: req.csrfToken(),
  });
});

router.post('/sign-in', signInValidators, csrfProtection, asyncHandler( async (req, res) => {
  const {
    username,
    password
  } = req.body;

  let errors = [];
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const user = await db.User.findOne({ where: { username } });
    if (user !== null) {
      const checkPassword = await bcrypt.compare(password, user.hashedPassword.toString());
      if (checkPassword) {
        signInUser(req, res, user);
        return res.redirect('/');
      }
    }
    errors.push('Sign-in failed for the provided username and password!');
  } else {
    errors = validationErrors.array().map((error) => error.msg);
  }
  res.render('sign-in', {
    title: 'Sign In',
    username,
    errors,
    csrfToken: req.csrfToken(),
  });
}));

router.post('/sign-out', (req, res) => {
  signOutUser(req, res);
  res.redirect('/sign-in');
});

module.exports = router;
