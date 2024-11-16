const jwt = require('jsonwebtoken');
let config  = require('../config/nodeConfig').config();

const generateToken = (user) => {
    return jwt.sign(user, config.JWT_KEY, { expiresIn: '2d' });
}

exports.generateToken = generateToken;