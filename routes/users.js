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
    // .custom((value) => {
    //   return User.findOne({ where: { username: value } }) // ***
    //     .then((user) => {
    //       if (user) {
    //         return Promise.reject('The provided username is already being used by another user.')
    //       }
    //     });
    // }),
    ,
  check('password')
    .exists({ checkFalsy: true})
    .withMessage('Please provide a password'),
  check('restaurantOwnerId')
    .exists({ checkFalsy: true})
    .withMessage("If you are a restaurant owner, please select the restaurant that you own, if not please select 'not an owner'")
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
    })
    signInUser(req, res, user); // auth function
    res.redirect('/', 302);
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.redirect('create-account', {
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
    if (user !== null) {
      //const checkPassword = await bcrypt.compare(password, user.hashedPassword.toString());
      if (password) {
        signInUser(req, res, user);
        return res.redirect('/users/register');
      }
    }
    errors.push('Sign-in failed for the provided username and password!');
  } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.redirect('sign-in', {
      title: 'Sign In',
      username,
      errors,
      csrfToken: req.csrfToken(),
    });


}));
module.exports = router;
