const mysql = require("mysql");

//Initiallising connection string
var DBconf = {
    host: "localhost",
    user: "commandeers",
    password: "Commandeers1234",
    database: "Antler"
};

var con = mysql.createConnection(DBconf); //Connecting to the database.




module.exports.con = con;
