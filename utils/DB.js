const mongoose = require('mongoose');
const config = require('../config/nodeConfig').config();

module.exports = () => {
    mongoose.connect(config.DB_URL).then(() => {
        console.log("Connected to DB");
    }).catch((error) => {
        console.log("Error in connecting to DB", error);
    });
}