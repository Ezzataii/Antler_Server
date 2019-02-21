var formidable = require('formidable');
var fs = require('fs');
var mysql = require('mysql');
var http = require('http');
var url = require('url');




var dir = "content/display1/";

http.createServer((req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = dir + files.filetoupload.name;
        fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
            console.log('File uploaded and moved!');
    
            query = "INSERT INTO ADS (name,user) VALUES (\'" + files.filetoupload.name + "\1' , 69)";
    
            con.query(query, function(error, rows, result) {
                console.log(query);
                res.end(JSON.stringify(rows));
                res.end();
            });
        });
    });
}).listen(8081);