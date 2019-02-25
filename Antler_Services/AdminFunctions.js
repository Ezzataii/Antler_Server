const parser = require('./parse');
const formidable = require("formidable");
const fs = require("fs");
const executeQuery = require("./DBCon").executeQuery;
const dir = "./images/";
const request = require("request");


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
                var newpath = dir + files.filetoupload.name;
                var query = insert("ADS",{'name':files.filetoupload.name,'user':req.query.user})         //Needs Dynamic User
                console.log(query);
                fs.rename(oldpath, newpath, (err)=>{
                    if (err) throw err;
                    console.log('File uploaded and moved!');
                    executeQuery (res, query);
                });
            });
}


function displayImage(req,ip,dir,name){
    var path = dir + name;
    var r = request.post(ip,(err,res,body)=>{
        if(err) throw err;
        console.log("URL: "+body);
    });
    var form = r.form();
    form.append('file',fs.createReadStream(path),{name: 'filetoupload', contentType: 'multipart/form-data'});
}





module.exports.get = get;
module.exports.remove = remove;
module.exports.update = update;
module.exports.insert = insert;
module.exports.handleForm = handleForm;
module.exports.displayImage = displayImage;
