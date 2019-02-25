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
    user: "root",
    password: "",
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
    if (req.query.token != "UserToken1234"){
        res.end("Unauthorized Access. Try again with a different token.");
    }else{
        var query = "SELECT * FROM "+req.params.table;
        executeQuery(res, query);
    }
});