const mysql = require("mysql");

//Initiallising connection string
var DBconf = {
    host: "51.77.192.7",
    user: "commandeers",
    password: "Commandeers1234",
    database: "Antler"
};

var con = mysql.createConnection(DBconf); //Connecting to the database.




module.exports.con = con;
