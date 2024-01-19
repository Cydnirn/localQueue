"use strict";
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");

const app = express();

//Endpoint export
const stallRoutes = require("./routes/stalls");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");

const server = http.createServer(app);
server.listen(process.env.BACK_PORT, () => {
    let message = "Server running on port " + process.env.BACK_PORT + " on date " + new Date();
    console.log(message);
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

const allowedOrigins = ["*"];

let corsOption = {
    origin: ["*"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: ['set-cookie']
};


app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin','https://3c28-203-77-246-210.ap.ngrok.io')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, ngrok-skip-browser-warning'
    );
    next();
})


app.use(cookieParser());
app.use(cookieSession({
    name: "authLocalSession",
    keys: ['ashfagsdg67741289jk3h87rt678t'],
    maxAge: 604800000
}));

const limiter = rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100,
});

app.use(helmet({
    contentSecurityPolicy: false
}))

/*
app.use(cors(corsOption));
*/

app.use(limiter);

app.enable('trust proxy');

app.use(session({
    secret: "LocalQueueuRedSus",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/stalls", stallRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

//Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.statusCode,
        message: err.message
    });
});