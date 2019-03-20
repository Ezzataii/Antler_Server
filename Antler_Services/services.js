//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
const adminServices = require('./Functions');
const executeQuery = require("./Functions").executeQuery;
const path = require('path');
//hi


// const API_ADMIN_TOKEN  = "JLAGSDhjhasldyqgashudjHBAGSDIUYQWIEJcabTQTY6Y718265361T2GEKJlkqhao8ds76R618253879801802039180927645678039809==";
const API_ADMIN_TOKEN = "abc";
const API_USER_TOKEN = "abc";
//const API_USER_TOKEN   = "HDGSHabsdjHGASLDJABGSDKGHGBlsdghqywtegytqKJSDBBDVQGFWEGUQJLWEVQTWIT47812316T23Y8OYtio6rituyhNmnGHHFAYGSHD545==";
//const API_DEVICE_TOKEN = "JhkFTHJGFvtrT6tR^5uy6tFjTYR^YtgvjtYRgIJHf7i6iuYGvHCRUTIRIGHvc5F7i^utGBFdtrSRYETtfgilUOI&trtdRFCkytY6YGFVnbv==";
const API_DEVICE_TOKEN = "abc";
//const API_DEVICE_TOKEN = "FGfgvkHHGHh6756^78OT6fGRF67R5TghfvTYr4ghCVty54AIYvdr%^rfvbd56tGJH,GVt67oUjhvbTUK%ugVBR5iGvby5gyo57O*ughbtuR=="
var app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

app.get("/api/list/:table",(req,res)=>{
    if (req.query.token != API_ADMIN_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        var query = adminServices.get(req.params.table,req.query);
        executeQuery(res, query);
    }
});

app.get("/api/device/authenticate/:id",(req,res)=>{
    if (req.query.token != API_DEVICE_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        var id = parseInt(req.params.id.toLowerCase(),36)/1423;
        var query = "SELECT * FROM DEVICE WHERE id = "+id;
        // console.log(query);
        executeQuery(res,query);
    }
});

app.post("/api/insert/device",(req,res)=>{
    if (req.query.token != API_ADMIN_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        var query = `INSERT INTO DEVICE(auth) VALUES (0)`;
        executeQuery(res,query);
    }
});


app.put("/api/update/:id",(req,res)=>{
    if (req.query.token != API_DEVICE_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        var id = parseInt(req.params.id.toLowerCase(),36)/1423;
        var query = adminServices.update("DEVICE",req.body.parameters,{"id":req.params.id});
        executeQuery(res, query);
    }
});

app.post("/api/upload/ad",(req,res)=>{
    console.log("Anything");
    if (req.query.token != API_USER_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        adminServices.handleForm(req,res);
    }
});


app.post("/api/deploy",(req,res)=>{
    if (req.query.token != API_ADMIN_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        console.log(JSON.stringify(req.body.parameters));
        //if (req.body.authentication == the correct one)
        var devices =req.body.parameters.devices;
        var images = req.body.parameters.images;
        var query = adminServices.displayAll(req,devices,images);
//        executeQuery(res,query);
    }
})
app.get("/api/delete/device/:id",(req,res)=>{
    var query = adminServices.remove("DEVICE",parseInt(req.params.id.toLowerCase(),36)/1423);
    executeQuery(res,query);
})

app.post("/api/delete/ad", (req,res) => {
    var ads = req.body.parameters.ads;
    for (var i = 0 ; i  < ads.length ; i++) {
        adminServices.deleteAd(ads[i]);
    }
})

app.get("/download/ad/:adid", (req,res)=>{
    var id = parseInt(req.params.adid.toLowerCase(),36)/1423;
    adminServices.selectAndSend(id,res);
})
