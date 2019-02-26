//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
const adminServices = require('./AdminFunctions');
const executeQuery = require("./DBCon").executeQuery;
const path = require('path');
// const fs = require('fs');


const API_ADMIN_TOKEN  = "JLAGSDhjhasldyqgashudjHBAGSDIUYQWIEJcabTQTY6Y718265361T2GEKJlkqhao8ds76R618253879801802039180927645678039809==";
const API_USER_TOKEN   = "HDGSHabsdjHGASLDJABGSDKGHGBlsdghqywtegytqKJSDBBDVQGFWEGUQJLWEVQTWIT47812316T23Y8OYtio6rituyhNmnGHHFAYGSHD545==";
// const API_DEVICE_TOKEN = "JhkFTHJGFvtrT6tR^5uy6tFjTYR^YtgvjtYRgIJHf7i6iuYGvHCRUTIRIGHvc5F7i^utGBFdtrSRYETtfgilUOI&trtdRFCkytY6YGFVnbv==";
const API_DEVICE_TOKEN = "abc";

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
        var query = "SELECT * FROM DEVICE WHERE id = "+req.params.id;
        // console.log(query);
        executeQuery(res,query);
    }
});



app.get("/",(req,res)=>{
    var filename = __dirname+"/../Antler_WebApp/index.html";
    res.sendFile(path.join(filename));
});

app.get("/:file",(req,res)=>{
    var filename = __dirname+"/../Antler_WebApp/" + req.params.file;
    if (req.params.file == "favicon.ico"){
        filename = __dirname+"/../Antler_WebApp/assets/images/Logo.png";
    }
    res.sendFile(path.join(filename));
});

app.get("/assets/logo",(req,res)=>{
    var filename = __dirname+"/../Antler_WebApp/assets/images/Logo.png";
    res.sendFile(path.join(filename));
});

app.get("/assets/fonts/:font",(req,res)=>{
    var filename = __dirname+"/../Antler_WebApp/assets/fonts/" + req.params.font;
    res.sendFile(path.join(filename));
});

app.get("/api/insert/device/:id",(req,res)=>{
    if (req.query.token != API_ADMIN_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        var query = `INSERT INTO DEVICE(id,auth) VALUES (${req.params.id},0)`;
        executeQuery(res,query);
    }
});


app.put("/api/update/:id",(req,res)=>{
    if (req.query.token != API_DEVICE_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
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
        var devices = req.body.parameters.devices;
        var images = req.body.parameters.images;
        var query = adminServices.displayAll(req,devices,images);
        executeQuery(res,query);
    }
})