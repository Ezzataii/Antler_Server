//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
var mysql = require('mysql');
var formidable = require('formidable');
var dir = "./";
var fs = require('fs');
const parse = require("./parse");
const adminServices = require('./AdminFunctions');
const userServices = require('./UserFunctions');


const API_ADMIN_TOKEN = "JLAGSDhjhasldyqgashudjHBAGSDIUYQWIE;JcabTQTY6Y718265361T2GEKJlkqhao8ds76R61825387980180203-9180927645678039-80-9==";
const API_USER_TOKEN = "HDGSHabsdjHGASLDJABGSDKGHGBlsdghqywtegytqKJSDBBDVQGFWEGUQJLWEVQTWIT47812316T23Y8OYti&*o&6r&i^t&uyhNmnGHHFAYGSHD";



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

//Initiallising connection string
var DBconf = {
    host: "localhost",
    user: "commandeers",
    password: "Commandeers1234",
    database: "Antler"
};
var con = mysql.createConnection(DBconf);
//Function to connect to database and execute query
    function executeQuery(res, query){
    con.query(query, function(err, rows, result) {
        console.log(query);
        if (err) throw err;
        res.end(JSON.stringify(rows));
        res.end();
    });
}


app.get("/api/list/:table",(req,res)=>{
    if (req.query.token != API_ADMIN_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        var query = adminServices.get(req.params.table,req.query);
        executeQuery(res, query);
    }
});


app.put("/api/update/:id",(req,res)=>{
    if (req.query.token != API_USER_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        var query = adminServices.update("DEVICE",req.body.parameters,{"id":req.params.id});
        executeQuery(res, query);
    }
});


app.post("api/upload/ad",(req,res)=>{
    if (req.query.token != API_USER_TOKEN){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                var oldpath = files.filetoupload.path;              //uploading file to server
                var newpath = dir + files.filetoupload.name;
                var query = adminServices.insert("ADS",{'name':files.filetoupload.name,'user':req.query.user})         //Needs Dynamic User
                console.log(query);
                fs.rename(oldpath, newpath, (err)=>{
                    if (err) throw err;
                    console.log('File uploaded and moved!');
                    executeQuery (res, query);
                });
            });
    }
});