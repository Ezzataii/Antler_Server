const mysql = require("mysql");
//Initiallising connection string
var DBconf = {
    host: "localhost",
    user: "commandeers",
    password: "Commandeers1234",
    database: "Antler"
};

var con = mysql.createConnection(DBconf);




module.exports.con = con;
