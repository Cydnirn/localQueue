/*
    Library for authentication
*/

module.exports={
    ensureGuest: (req, res, cb) => {
        if(req.isAuthenticated()){
            return cb();
        }
        else{
            res.redirect("http://localhost:5000/user/account/"+req.user[0].userid);
        }
    },
    ensureAuth: (req, res, cb) =>{
        if(!req.isAuthenticated()){
            res.redirect("/user/signin");
        }
        else{
            return cb();
        }
    },
    ensureStore: (req, res, cb) => {
        if(!req.user[0].isStore){
            res.redirect("/stalls");
        }
        else{
            return cb();
        }
    }
}