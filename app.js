const express = require('express');
const app = express();

const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const expressRateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./src/Router/api');

// Security Middleware implementation
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(cors());

// RateLimit Implementation
const limiter = expressRateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 2000,
});
app.use(limiter);

// Increase the limit for body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
const URL = "mongodb+srv://<username>:<password>@cluster0.75qh3yi.mongodb.net/BikroyCom?retryWrites=true&w=majority";
const option = {
    user: 'rakib107054',
    pass: 'rakib172561',
    autoIndex: true
};

mongoose.connect(URL, option).then(() => {
    console.log("Database connection successful");
}).catch((e) => {
    console.log(e);
});

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb' }));

app.set('etag', false);
app.use('/api/v1', router);

// Connect front-end to back-end
app.use(express.static('client/dist'));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

module.exports = app;
