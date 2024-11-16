const User = require('../models/User');

const validateUserExists = async (email) => {
    const user = await User.find({ email });
    if (user.length != 0) {
        throw new Error('email already exists');
    }
    return true;
}

exports.validateUserExists = validateUserExists;