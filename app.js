require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./config/nodeConfig').config();
const DB = require('./utils/DB');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        status: 0,
        message: err.message || 'Unknown Error'
    });
});

app.listen(config.PORT, () => {
    console.log("server running on ", config.PORT);
    DB();
});