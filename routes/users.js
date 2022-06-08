const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const {User, Restaurant} = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const { signInUser } = require('../auth');

const router = express.Router();

const bcrypt = require('bcryptjs');
const indexRouter = require('./index');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Test');
});

router.get('/register', csrfProtection, asyncHandler ( async (req, res) => {
  const users = await User.build(); // ***
  res.render('create-account', {
    title: "Create Account",
    csrfToken: req.csrfToken(),
  });
}));

const userValidators = [
  check('username')
    .exists({ checkFalsy: true})
    .withMessage('Please provide a username')
    .isLength({ max: 100 })
    .withMessage('Username cannot exceed 100 characters')
    .custom((value) => {
      return User.findOne({ where: { username: value } }) // ***
        .then((user) => {
          if (user) {
            return Promise.reject('The provided username is already being used by another user.')
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true})
    .withMessage('Please provide a password'),
]

const signInValidator = [
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
      isOwner: false
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

router.post('/sign-in', signInValidator, csrfProtection, asyncHandler( async (req, res) => {
  const {
    username,
    password
  } = req.body;
  console.log(username)

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { username } }); //*********** Fix this */
    console.log(user.password)
    if (user !== null) { //if we have an account
      const checkPassword = await bcrypt.compare(password, user.password.toString());
      if (checkPassword) {
        signInUser(req, res, user);
        return res.redirect('/');
      }
      errors.push('Sign-in failed for the provided username and password!');
    }
  } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    console.log(errors)
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
