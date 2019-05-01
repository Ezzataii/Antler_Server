const parser = require('./parse');
const formidable = require("formidable");
const fs = require("fs");
const con = require("./DBcnfg").con;
const request = require("request");
const masterSocket = require('./master-socket');
//Function to connect to database and execute query
function executeQuery(res, query){
    /*
        Given a query string and the express response,
        executes the SQL query and res.end()s the response.
     */
    con.query(query, function(err, rows, result) {
        console.log(query);
        if (err) throw err;
        for (var i = 0 ; i < rows.length ; i++){
            if (rows[i].id != null){
                rows[i].id = (rows[i].id*1423).toString(36).toUpperCase();
            } else if (rows[i].groupid != null) {
                rows[i].groupid = (rows[i].groupid*1423).toString(36).toUpperCase();
            }
        }
        res.end(JSON.stringify(rows));
        res.end();
    });
}




function handleForm(req,res){
    /*
        I have no idea what's happening here. We should change this. Copied from stack overflow.
    */
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var oldpath = files.filetoupload.path;              //uploading file to server
        var newpath = __dirname+"/images/" + files.filetoupload.name;
        var query = parser.insert("ADS",{'name':files.filetoupload.name,'user':req.query.user,'dir':'/images/'})         //Needs Dynamic User
        console.log(query);
        fs.rename(oldpath, newpath, (err)=>{
            if (err) throw err;
            console.log('File uploaded and moved!');
            executeQuery (res, query);
        });
    });
}

function handleCSVForm(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, (err,fields,files)=>{
        var oldpath = files.csvfile.path;
        var newpath = `${__dirname}/csvs/${files.csvfile.name}`;
        var query = parser.insert("GRAPHS",{'name':files.csvfile.name.substring(0,files.csvfile.name.length - 3)+'png','user':req.query.user,'dir':'/graphs/'});
        fs.rename(oldpath, newpath,(err)=>{console.log("I guess it worked?");});
        generateGraph(files.csvfile.name,res,query);
    });
}

function handlePSAForm(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        var oldpath = files.psafile.path;
        var newpath = `${__dirname}/psa/${files.psafile.name}`;
        console.log(newpath);
        fs.rename(oldpath,newpath,(err)=>{console.log("PSA worked?");});
        var query = parser.insert("PSAS",{'name':files.psafile.name, 'dir':'/psas/'});
        // console.log(query);
        con.query(query, (err,result,rows)=>{
                var json = {
                    psaID: encryptKey(result.insertId),
                    psaDuration: fields.duration,
                    devices: fields.devices,
                    text: fields.text,
                    writeMode: fields.writeMode
                };
                masterSocket.sendPsasToIds(json);
            })
        });
}

function generateGraph(csvFile,res,query) {
    const shelljs = require('shelljs');
    shelljs.exec(`python GenerateGraph.py ${csvFile}`);
    executeQuery(res, query);
}

function decryptKey(id) {
    //Given an alphnumeric key, it returns the proper integer key that works with antler's database
    return parseInt(id.toLowerCase(),36)/1423;
}

function encryptKey(id) {
    //Given an integer key that works with antler's database, it returns the proper alphnumeric key
    return (id*1423).toString(36).toUpperCase();
}

function selectAndSend(id,res) {
    /*
        Given an ad ID, gets its name and directory and sets it up for download,
        works if you enter the get request into a browser.
    */
    var query = `SELECT dir,name FROM ADS WHERE id=${id}`;
    con.query(query, function(err, rows, result) {
        if (rows.length>0){
            res.download(__dirname+rows[0].dir+rows[0].name);
        } else{
            res.end("Woops! SelectAndSend failed!");
        }
    });
}

function viewImage(res,id) {
    /*
        Given an ad ID, get its name and directory and serves it.
    */
    con.query("SELECT dir,name FROM ADS WHERE id="+id,(err,rows,result)=>{
        if (rows.length>0){
            var ad = rows[0];
            res.sendFile(__dirname+ad.dir+ad.name);
        }else{
            res.end("Woops! viewImage returned no results!");
        }
    })
}

function viewGraph(res,id)  {
    con.query("SELECT dir,name FROM GRAPHS WHERE id = " +id,(err,rows,result)=>{
        if (rows.length>0){
            var graph = rows[0];
            res.sendFile(__dirname+graph.dir+graph.name);
        }else{
            res.end("Woops! viewImage returned no results!");
        }
    })
}

function viewPsa(res,id) {
    con.query("SELECT dir,name FROM PSAS WHERE id = "+id,(err,rows,result)=>{
        if (rows.length>0) {
            var psa = rows[0];
            res.sendFile(__dirname+psa.dir+psa.name);
        } else {
            res.end("Woops! Viewimage returned no results!");
        }
    })
}

function deleteGraph(res,graph) {
    console.log(graph);
    var id = decryptKey(graph);
    con.query(`SELECT * FROM GRAPHS WHERE id=${id}`, (err,rows,result)=>{
        var path = __dirname + rows[0].dir + rows[0].name;
        con.query(parser.remove("GRAPHS",id));
        fs.unlink(path, (err)=>{
            console.log("deleted graph file");
        })
    })
}

function getGroupAds(groupid) {
    con.query(`SELECT * FROM ADS a JOIN ADGROUPS g ON a.id = g.adid WHERE groupid = ${groupid}`, (err,rows,result)=>{
        return rows;
    });
}
function deleteAd (res,ad){
    /*
        Given an ad ID, it gets its name and directory.
        Deletes it from both the database and the images directory.
    */
    var id = decryptKey(ad);
    con.query(`SELECT * FROM ADS WHERE id=${id}`,(err,rows,result)=>{
        if (rows.length>0){
            var path = __dirname+rows[0].dir+rows[0].name;
            con.query(parser.remove("ADS", id));
            con.query("DELETE FROM ADGROUPS WHERE adid = "+ id);
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
    /*
        Given a Device ID, removes it from the database.
    */
    var id = decryptKey(device);
    executeQuery(res, `DELETE FROM DEVICE WHERE id=${id}`);
}



module.exports.getGroupAds = getGroupAds;
module.exports.handlePSAForm = handlePSAForm;
module.exports.handleForm = handleForm;
module.exports.handleCSVForm = handleCSVForm;
module.exports.executeQuery = executeQuery;
module.exports.selectAndSend = selectAndSend;
module.exports.viewImage = viewImage;
module.exports.viewGraph = viewGraph;
module.exports.viewPsa = viewPsa;
module.exports.deleteAd = deleteAd;
module.exports.deleteDevice = deleteDevice;
module.exports.decryptKey = decryptKey;
module.exports.encryptKey = encryptKey;
module.exports.deleteGraph = deleteGraph;

