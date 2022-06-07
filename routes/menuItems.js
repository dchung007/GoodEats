const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const {User, Restaurant} = db;
const { csrfProtection, asyncHandler, csrf } = require('./utils');

const { signInUser } = require('../auth');

const router = express.Router();

const bcrypt = require('bcryptjs');
const indexRouter = require('./index');
