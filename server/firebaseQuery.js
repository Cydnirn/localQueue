const fireStore = require("./firebase");
const { FieldValue, Timestamp } = require("firebase-admin/firestore");

/* 
    Stalls = S
    Stalls Specified = SS
    Stalls Specified Menu = SSM

    Users = U
    Users Specified = US
*/

//Referrence specified
const db = fireStore.db;
const usersRef = db.collection('Users');
const stallsRef = db.collection('stalls');
const ordersRef = db.collection('orders');

/* Interesting code format 
async function verifyEmptyId(cache){
    const userSnap = await usersRef.where("userId", "==", cache).get();
    const usersList = com.JSONimp(userSnap.docs.map((doc) => docs.data()));
    return usersList.length ;
}
*/

async function getUsers() {
    const usersSnap = await usersRef.get();
    const usersList = usersSnap.docs.map((doc) => doc.data());
    return Promise.resolve(usersList);
}

async function getUS(id) {
    const userSnap = await usersRef.where("username", "==", id).get();
    const usersList = userSnap.docs.map((doc) => doc.data());
    return Promise.resolve(usersList);
}

async function getUSEmail(email) {
    const userSnap = await usersRef.where("email", "==", email).get();
    const usersList = userSnap.docs.map((doc) => doc.data());
    return Promise.resolve(usersList);
}

async function getUSGoogle(id) {
    const usersSnap = await usersRef.where("googleId", "==", id).get();
    const usersList = usersSnap.docs.map((doc) => doc.data());
    return Promise.resolve(usersList);
}

async function getUSId(id) {
    const userSnap = await usersRef.where("userId", "==", id).get();
    const userList = userSnap.docs.map((doc) => doc.data());
    return Promise.resolve(userList);
}

async function setUSGoogle(displayName, emails, id, userId, type = false) {
    console.log("Setting google Account...");
    console.log(displayName, emails, id, userId, type);
    try {
        let res = await usersRef.doc(userId).set({
            userId: userId, username: displayName, email: emails,
            isPremium: type, totalPurhase: 0,
            memberSince: Timestamp.now(), googleId: id
        });
        console.log("Setting complete");
        return Promise.resolve(res);
    } catch (err) {
        return err
    }
}

async function setUSLocal(displayName, emails, id, password, type = false) {
    console.log("Setting local Account....");
    console.log(displayName, emails, id, password);
    try {
        const res = await usersRef.doc(id).set({
            userId: id, username: displayName, email: emails,
            password: password, isPremium: type, totalPurchase: 0,
            memberSince: Timestamp.now()
        });
        console.log(res);
        return Promise.resolve(true);
    } catch (err) {
        console.log(err);
        return Promise.resolve(false);
    }
}

//Stalls Start from here

async function getStalls() {
    const stallSnap = await stallsRef.get();
    const stallList = stallSnap.docs.map((doc) => doc.data());
    return Promise.resolve(stallList);
}

async function getSSM(stallName) {
    const stallSnap = await stallsRef.where("searchField", "array-contains", stallName).get();
    const stallExc = stallSnap.docs.map((doc) => doc.data());
    return Promise.resolve(stallExc);
}

async function getMenuRef(stallName) {
    return db.collection(`stalls/${stallName}/Menus`);
}

async function getSSMData(stallName) {
    const menuRef = await getMenuRef(stallName);
    const menuSnap = await menuRef.get();
    const menuList = menuSnap.docs.map((doc) => doc.data());
    return Promise.resolve(menuList);
}

async function getSSMPriceLessEqual(stallName, price) {
    const menuRef = await getMenuRef(stallName);
    const menuSnap = await menuRef.where("price", "<=", price).get();
    const menuList = menuSnap.docs.map((doc) => doc.data());
    return Promise.resolve(menuList);
}

async function getSSMPriceBiggerEqual(stallName, price) {
    const menuRef = await getMenuRef(stallName);
    const menuSnap = await menuRef.where("price", ">=", price).get();
    const menuList = menuSnap.docs.map((doc) => doc.data());
    return Promise.resolve(menuList);
}

async function getSSMInPriceRange(stallName, minPrice, maxPrice) {
    const menuRef = await getMenuRef(stallName);
    const menuSnap = await menuRef.where("price", ">=", minPrice).where("price", "<=", maxPrice).get();
    const menuList = menuSnap.docs.map((doc) => doc.data());
    return Promise.resolve(menuList);
}



const userQuery = {
    getUsers,
    getUS,
    getUSEmail,
    getUSGoogle,
    getUSId,
    setUSGoogle,
    setUSLocal
}

const stallQuery = {
    getStalls,
    getSSM,
    getSSMData,
    getSSMPriceLessEqual,
    getSSMPriceBiggerEqual,
    getSSMInPriceRange
}

const orderQuery = {

}

module.exports = {
    userQuery,
    stallQuery,
    orderQuery
}