/*
    List of modules use in user.js for authenticating user
*/
const jwt = require("jsonwebtoken");
const { userQuery } = require("../firebaseQuery");
const { generateIdHash,passwordHash } = require("./commonMod");

function signJWT(payload) {
    return jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: 6048000 });
}

async function insertAuth(req, res, user, email, password){
    try {
        let hash = await passwordHash(password);
        let userid = await generateIdHash()
        let userInsert = await userQuery.setUSLocal(user, email, userid, hash);
        if(!userInsert){
            res.status(500).json({error: "Internal server error - Failed at adding user account"});
        }
        else{
            return userInsert;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error - Failed to add account"})
    }
}

async function authLogin(req, res) {
    try {
        let user = req.body.username;
        let verify = await userQuery.getUS(user);
        if (!verify || !verify.length) {
            return res.status(400).json({ error: 'User not found' });
        }

        const payload = {
            username: user
        };
        const localToken = signJWT(payload);
        console.log(localToken);

        if (!process.env.JWT_TOKEN || !process.env.JWT_TOKEN.length) {
            return res.status(500).json({ error: 'Internal server error - Undefined JSON Token' });
        }
        console.log("Success in JWT");
        res.cookie("jwt", localToken, { expires: new Date(Date.now() + 604800), httpOnly: true });
        res.redirect(`${process.env.PROTOCOL}${process.env.SERVER_NAME}/user/auth/local/jwt`);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error - Failed to process request' });
    }
}

const handleSuccessAuth = (req, res) =>{
    if (req.user){
        res.status(200).json({message:"Auth Success"});
    }
}

const handleJwtAuth = async (req, res) => {
    if(req.user){
        console.log("Into login success");
        res.redirect(`${process.env.PROTOCOL}${process.env.SERVER_NAME}:${process.env.BACK_PORT}/user/login/success`);
    }
}

const handleGoogleAuth = async (req, res) =>{
    if (req.user){
        const payload = {
            googleAuthToken: req.user[0].googleId,
            email: req.user[0].email,
            username: req.user[0].username
        };

        const googleAuthToken = signJWT(payload);
        res.cookie("jwt", googleAuthToken, { expires: new Date(Date.now() + 604800000), httpOnly: true});

        return res.json({user, googleAuthToken});
    }
}

const handleMod = {
    handleGoogleAuth,
    handleJwtAuth,
    handleSuccessAuth
}

module.exports = {
    insertAuth,
    authLogin,
    handleMod
}