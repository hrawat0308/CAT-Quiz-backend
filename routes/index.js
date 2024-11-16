const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { getUsers, createUser, login } = require('../controller/userController');
const { validateUserExists } = require('../utils/validations');

router.post('/login', [
    check('email').trim().notEmpty().withMessage('email is mandatory'),
    check('password').trim().notEmpty().withMessage('password is mandatory')
], login);

router.post('/user', [
    check('name').trim().notEmpty().withMessage('name is mandatory'),
    check('email').trim().notEmpty().withMessage('email is mandatory').custom((value) => validateUserExists(value)),
    check('password').trim().notEmpty().withMessage('password is mandatory')
], createUser);

router.get('/users', getUsers);

module.exports = router;