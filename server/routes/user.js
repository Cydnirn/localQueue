const express = require('express');
const router = express.Router();
const { JSONimp } = require("../modules/commonMod");
const { insertAuth, authLogin, handleMod } = require("../modules/modAuth");
const passport = require("passport");
const passmod = require("../modules/passport");
const { ensureAuth } = require("../middleware/auth");
const { userQuery } = require('../firebaseQuery');

passmod.googleInitialize;
passmod.jwtInitialize;
passmod.localInitialize;

passport.serializeUser((user, cb) => {
    return cb(null, user);
});
passport.deserializeUser((user, cb) => {
    return cb(null, user);
});

router.get("/login/success", handleMod.handleSuccessAuth);

router.get('/auth/local/jwt', passmod.jwtAuth, handleMod.handleJwtAuth);

router.get('/auth/google', passmod.googleScope);

router.get('/auth/google/callback', passmod.googleAuth, handleMod.handleGoogleAuth);

router.route("/signup").get((req, res, next) => {
    try {
        res.status(200);
    } catch (error) {
        console.log(error);
        next(error);
    }
})
    .post(async (req, res, next) => {
        try {
            const user = req.body.username;
            const email = req.body.email;
            const password = req.body.password;

            if (!user || !user.length) {
                const error = new Error("No Username");
                error.statusCode = 400;
                throw error;
            }

            if (!email || !email.length) {
                const error = new Error("No Email");
                error.statusCode = 400;
                throw error;
            }

            if (!password || !password.length) {
                const error = new Error("No Password");
                error.statusCode = 400;
                throw error;
            }

            // Validate email format using regex
            const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!emailRegex.test(email)) {
                const error = new Error("Invalid email format");
                error.statusCode = 400;
                throw error;
            }

            let emailVer = await userQuery.getUSEmail(email);
            if (emailVer.length != 0) {
                const error = new Error("Account exist");
                error.statusCode = 409;
                throw error;
            }
            else {
                await insertAuth(req, res, user, email, password);
                return authLogin(req, res);
            }
        } catch (error) {
            console.log("From user: ");
            console.log(error.message);
            next(error);
        }
    });

router.route("/login")
    .get(async (req, res) => {
        return res.status(200).send();
    })
    .post(passmod.localAuth, async (req, res) => {
        return authLogin(req, res);
    });

function clearAllCookies(req, res, next){
    const cookieNames = Object.keys(req.cookies);
    cookieNames.forEach(cookieName => res.clearCookie(cookieName));
    next();
}

router.route("/failed").get((req, res, next) => {
    try {
        const error = new Error("Auth Failed");
        error.statusCode = 404;
        throw error;   
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

router.route("/logout").get(clearAllCookies, (req, res) => {
    req.logout();
    req.session = null;
    res.clearCookie("jwt");
    res.json({message: "Logged Out"})
})

router.route("/acc/:userid").get(ensureAuth, async (req, res) => {
    try {
        res.json(JSONimp(userQuery.getUSId(req.params.userid)));   
    } catch (error) {
        console.error(error);
        res.status(500).json({"error":"Internal Server Error"})
    }
});

module.exports = router;