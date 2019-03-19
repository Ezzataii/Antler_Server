const mysql = require("mysql");
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
        for (var i = 0 ; i < rows.length ; i++){
            if (rows[i].id != null){
                rows[i].id = (rows[i].id*1423).toString(36).toUpperCase();
            }
        }
        res.end(JSON.stringify(rows));
        res.end();
    });
}


module.exports.executeQuery = executeQuery;
