const parser = require('./parse');
const formidable = require("formidable");
const fs = require("fs");
const con = require("./DBcnfg").con;
const request = require("request");

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


function get(table,cond){
    var where = parser.parseWhere(cond);
    if (where != ""){
        where = " WHERE "+where;
    }
    var parameters = "*";
    return "SELECT " + parameters + " FROM " + table +  where;
}

function remove(table,id){
    return "DELETE FROM "+ table + " WHERE id = '" + id + "'";
}


function update(table,pars,cond){
    var query = "UPDATE " + table + " SET ";
    var vals = parser.parseWhere(pars);
    vals = parser.replaceAll(vals , " and " , ", ");
    var where = parser.parseWhere(cond);
    return query + vals + " WHERE " + where;
}

function insert(table,pars){
    var query = "INSERT INTO " + table +" ";
    pars = parser.parseWhere(pars);
    var cols = "(";
    var vals = "(";
    pars = pars.split(" and ");
    for (var i = 0 ; i < pars.length ; i++){
        var temp = pars[i].split("=");
        cols += temp[0]+", ";
        vals += temp[1]+", ";
    }
    vals = vals.slice(0,vals.length - 2) +")";
    cols = cols.slice(0,cols.length - 2) +")";
    return query + cols + " VALUES " + vals;
}

function handleForm(req,res){
    var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                var oldpath = files.filetoupload.path;              //uploading file to server
                var newpath = __dirname+"/images/" + files.filetoupload.name;
                var query = insert("ADS",{'name':files.filetoupload.name,'user':req.query.user,'dir':'/images/'})         //Needs Dynamic User
                console.log(query);
                fs.rename(oldpath, newpath, (err)=>{
                    if (err) throw err;
                    console.log('File uploaded and moved!');
                    executeQuery (res, query);
                });
            });
}

function decryptKey(id) {
    return parseInt(id.toLowerCase(),36)/1423;
}

function encryptKey(id) {
    return (id*1423).toString(36).toUpperCase();
}

function selectAndSend(id,res) {
    var query = `SELECT dir,name FROM ADS WHERE id=${id}`;
    con.query(query, function(err, rows, result) {
        if (rows.length>0){
            res.download(__dirname+rows[0].dir+rows[0].name);
        } else{
            res.end("Woops! SelectAndSend failed!");
        }
    });
}
function deleteAd (ad){
    var id = decryptKey(ad);
    con.query(`SELECT * FROM ADS WHERE id=${id}`,(err,rows,result)=>{
        if (rows.length>0){
            var path = __dirname+rows[0].dir+rows[0].name;
            con.query(remove("ADS", id));
            fs.unlink(path, function(err){
                if (err)  throw err;
                console.log("Successful deleted ad file");
            }); 
        }else{
            res.end("Woops! Delete ad returned no results");
        }
    })
}

function deleteDevice(res,device) {
    var id = decryptKey(device);
    executeQuery(res, `DELETE FROM DEVICE WHERE id=${id}`);
}


function viewImage(res,id) {
    con.query("SELECT dir,name FROM ADS WHERE id="+id,(err,rows,result)=>{
        if (rows.length>0){
            var ad = rows[0];
            res.sendFile(__dirname+ad.dir+ad.name);
        }else{
            res.end("Woops! viewImage returned no results!");
        }
    })
}

module.exports.get = get;
module.exports.remove = remove;
module.exports.update = update;
module.exports.insert = insert;
module.exports.handleForm = handleForm;
module.exports.executeQuery = executeQuery;
module.exports.selectAndSend = selectAndSend;
module.exports.viewImage = viewImage;
module.exports.deleteAd = deleteAd;
module.exports.deleteDevice = deleteDevice;
module.exports.decryptKey = decryptKey;
module.exports.encryptKey = encryptKey;

