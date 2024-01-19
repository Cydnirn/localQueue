const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const { JSONimp, generateIdHash } = require("./commonMod");
const passport = require("passport");
const userQuery = require("../firebaseQuery").userQuery;

//JWT Passport Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJWT;

//Local passport strategy
const localStrategy = require('passport-local').Strategy;

//Extract cookies from web storage
let cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.jwt;
    }
    return token;
}

async function googleSetAcc(profile, cb) {
    console.log("User doesn't exist");
    let userId = await generateIdHash();
    console.log("Id generate is complete");
    await userQuery.setUSGoogle(profile.displayName, profile.emails[0].value, profile.id, userId);
    try {
        let verify = await userQuery.getUSGoogle(profile.id);
        console.log(verify);
        if (verify.length != 0) {
            console.log("User created");
            return verify;
        }
    } catch (error) {
        return cb(err);
    }
}

async function googleAccFlow(profile, cb) {
    try {
        let user = JSONimp(await userQuery.getUSGoogle(profile.id));
        if (user.length != 0) {
            console.log("User exits");
            return cb(null, user);
        }
        else {
            const resAcc = await googleSetAcc(profile, cb);
            console.log("Settings done");
            return cb(null, resAcc);
        }
    } catch (error) {
        return cb(error);
    }
}

async function jwtAuthUser(profile, cb) {
    let userName = await userQuery.getUS(profile.username);
    if (userName.length != 0) {
        console.log("Username exist");
        return cb(null, profile);
    }
    else {
        console.log("User doesn't exist");
        return cb(null, false);
    }
}

async function jwtFlow(profile, cb) {
    try {
        console.log(profile);
        let user = await userQuery.getUS(profile.username);
        if (user.length != 0) {
            console.log("User exist");
            return cb(null, user);
        }
        else {
            await jwtAuthUser(profile, cb);
        }
    } catch (error) {
        console.log(error);
        return error
    }
}

async function localPassAuth(usercred, password, useracc, cb) {
    bcrypt.compare(password, usercred, async (err, res) => {
        if (res) {
            return cb(null, useracc);
        }
        if (err) {
            return (err);
        }
        else {
            console.log("Auth error");
            return cb(null, false, { message: "Incorrect Password" });
        }
    });
}

async function localFlow(username, password, cb) {
    try {
        let findUser = await userQuery.getUS(username);
        if (findUser.length != 1) {
            console.log("User doesn't exist");
            return cb(null, false);
        }
        else {
            findUser = JSONimp(findUser);
            let VPass = findUser[0].password;
            await localPassAuth(VPass, password, findUser, cb);
        }
    } catch (error) {
        return error;
    }
}

//Passport google field

const googleClient = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/user/auth/google/callback'
};

const googleAuth = async (accessToken, refreshToken, profile, cb) => {
    const newUser = {
        googleID: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.emails[0].value
    };
    await googleAccFlow(profile, cb);
};

//Paspport jwt field

const jwtSettings = {
    secretOrKey: process.env.JWT_TOKEN,
    jwtFromRequest: cookieExtractor
};

const jwtAuth = async (profile, cb) => {
    console.log("JWT Read");
    await jwtFlow(profile, cb);
};

//Passport local field

const localField = {
    usernameField: 'username',
    emailField: "email",
    passwordField: 'password',
    phonenumField: 'phoneNum'
};

const localAuth = async (username, password, cb) => {
    console.log(username, password);
    await localFlow(username, password, cb);
}

module.exports = {
    googleInitialize: passport.use('google', new GoogleStrategy(googleClient, googleAuth)),
    jwtInitialize: passport.use('jwt', new JwtStrategy(jwtSettings, jwtAuth)),
    localInitialize: passport.use('local', new localStrategy(localField, localAuth)),
    jwtAuth: passport.authenticate('jwt', {
        failureRedirect: '/user/failed',
        failureMessage:"Failed at JWT Authentication",
        successRedirect: '/user/login/success'
    }),
    googleScope: passport.authenticate('google', {
        scope: ['profile', 'email']
    }),
    googleAuth: passport.authenticate('google', {
        failureRedirect: '/user/failed'
    }),
    localAuth: passport.authenticate('local', {
        failureRedirect: "/user/failed",
        failureMessage: "Auth failed"
    })
}