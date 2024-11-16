const mongoose = require('mongoose');
let { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');
const User = require('../models/User');

const login = async (req, res, next) => {
    try{
        const { email, password } = matchedData(req);
        let user = await User.findOne({ email });
        user = user ? user.toJSON() : { password: '' };
        if(!bcrypt.compareSync(password, user.password)){
            return res.status(422).json({ status: 0, message: [ "invalid email or password" ] });
        }
        delete user.password;
        const token = generateToken(user);
        res.json({ 
            status: 1, 
            message: "logged in successfully", 
            data: {
                token,
                user
            } 
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ status: 0, message: "Something went wrong ! Please try again Later."});
    }
}

const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(422).json({ status: 0, message: [errors.errors[0].msg] });
        }
        const { name, email, password } = matchedData(req);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let user = await User.create({ name, email, password: hash });
        user = user.toJSON();
        delete user.password;
        const token = generateToken(user);
        res.json({ 
            status: 1, 
            message: `${name} registered successfully`, 
            data: {
                token,
                user
            } 
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ status: 0, message: "Something went wrong ! Please try again Later."});
    }
}

const getUsers = async (req, res, next) => {
    try {
        let users = await User.find({});
        users = users.map((user) => {
            user = user.toJSON();
            delete user.password;
            return user;
        });
        res.json({ status: 1, message: "users fetched", data: users });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ status: 0, message: "Something went wrong ! Please try again Later."});
    }
}

exports.createUser = createUser;
exports.getUsers = getUsers;
exports.login = login;