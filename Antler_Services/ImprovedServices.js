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

//GET API
app.get("/api/:table", function(req , res){
    var query = adminServices.get(req.params.table, req.query);     //100% done
    executeQuery (res, query);
});

//POST API
app.post("/:api/:table", function(req , res){
    var query = "";
    if (req.params.api == "UPLOAD"){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var oldpath = files.filetoupload.path;              //uploading file to server
            var newpath = dir + files.filetoupload.name;
            query = adminServices.insert(req.params.table,{'name':files.filetoupload.name,'user':'55'})         //Needs Dynamic User
            fs.rename(oldpath, newpath, (err)=>{
                if (err) throw err;
                console.log('File uploaded and moved!');
                executeQuery (res, query);
            });
        });
    }else{
        console.log(req.body.parameters);
        query = adminServices.insert(req.params.table,req.body.parameters);                         //100% done
        executeQuery (res, query);
    }
});

//PUT API
 app.put("/api/:table/:id", function(req , res){
    var query = adminServices.update(req.params.table,req.body,req.params.id);                                  //Untouched
    executeQuery (res, query);
});

// DELETE API
 app.delete("/api/:table/:id", function(req , res){
    var query =adminServices.remove(req.params.table,req.params.id);                                            //Untouched
    executeQuery (res, query);
});