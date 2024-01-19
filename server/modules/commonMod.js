/*
    Module to simplified turning non JSON to JSON then reading it
*/
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { userQuery } = require("../firebaseQuery");

function JSONimp(data){
    try {
        let dataParse = JSON.parse(JSON.stringify(data));
        return dataParse;   
    } catch (err) {
        return err;
    }
}

async function idHash(){
    try {
        return crypto.randomBytes(8).toString("hex"); 
    } catch (err) {
        console.log (err);
        return res.send(500).json({"error":"Internal Server Error - Failed Generating ID"});
    }
}

async function generateIdHash(){
    let hash = await idHash();
    let hashNew;
    let isEmpty = false;
    while(!isEmpty){
        try {
            console.log(hash);
            console.log("Generating id...")
            let verify = await userQuery.getUSId(hash);
            verify = JSON.parse(JSON.stringify(verify));
            if (verify.length != 0){
                hash = await idHash();
            }
            else{
                hashNew = hash;
                isEmpty = true;
            }   
        } catch (err) {
            return err;
        }
    }
    console.log(hashNew);
    return hashNew;
}

async function passwordHash(password){
    const salt = parseInt(process.env.BCRYPT_SALT);
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(hash);
                resolve(hash);
            }
        });
    })
}


module.exports = {
    JSONimp,
    passwordHash,
    generateIdHash,
};