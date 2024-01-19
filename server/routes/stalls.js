const express = require("express");
const router = express.Router();
const com = require("../modules/commonMod");
const query = require("../firebaseQuery").stallQuery;

router.route("/").get(async(req, res) => {
    let stallSearch = req.query.stallName;
    console.log(stallSearch);
    if(!stallSearch){
        let stalls = await query.getStalls();
        res.json({"results":stalls});
    }
    else{
        let stalls = await query.getSSM(stallSearch);
        res.json({"results":stalls});
    }
});

router.route("/:stallName").get(async (req, res) =>{
    res.redirect(req.params.stallName+'/menus')
});

router.route("/:stallName/menus").get(async (req, res) =>{
    let stallName = req.params.stallName;
    let minPriceField = req.body.priceMin;
    let priceField = req.body.priceMax;
    if(!priceField && !minPriceField){
        let getMenu = await query.getSSMData(stallName);
        res.json({"results":getMenu});
    }
    else if(!minPriceField){
        priceField = parseInt(priceField);
        let getPrice = await query.getSSMPriceLessEqual(stallName, priceField);
        res.json({"results":getPrice});
    }
    else if(!priceField){
        minPriceField = parseInt(minPriceField);
        let getPrice = await query.getSSMPriceBiggerEqual(stallName, minPriceField);
        res.json({"results":getPrice});
    }
    else{
        priceField = parseInt(priceField);
        minPriceField = parseInt(minPriceField);
        let getPrice = await query.getSSMInPriceRange(stallName, minPriceField, priceField);
        res.json({"results":getPrice});
    }
});

module.exports = router;