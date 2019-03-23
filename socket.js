var express = require('express');
var app = express();
var server = require('http').createServer(app);
var adminServices = require('./Functions');
var con = require('./DBcnfg').con;
var socketLookup = {};

app.get("/tcp/get/alive",(req,res)=>{
    res.end(JSON.stringify(socketLookup));
})


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', (socket)=>{
    var DeviceID = socket.request._query['id'];
    var socketID = socket.id;
    console.log("Client connected! "+socketID+" "+DeviceID);
    socket.emit('message',"Hello world!");
    socketLookup[DeviceID] = socketID;
    console.log(JSON.stringify(socketLookup));

    socket.on('deployToServer', (message)=>{
        var idsToSend = message.devices;
        var images = [];
        var query = `SELECT id,Duration FROM ADS WHERE id=${adminServices.decryptKey(message.images[0])}`;
        for (var i = 1 ; i < message.images.length ; i++){
            query += ` OR id=${adminServices.decryptKey(message.images[i])}`;
        }
        console.log(query);
        con.query(query,(err,rows,res)=>{
            console.log(rows);
            for (var i = 0 ; i < rows.length ; i++){
                var image = {}
                image.id = adminServices.encryptKey(rows[i].id);
                image.duration = rows[i].Duration;
                images.push(image);
            }
            idsToSend.forEach(element => {
                socket.to(socketLookup[element]).emit('deployToClient',images);
            });
        })
    })
})
server.listen(3000);

module.exports.socketLookup = socketLookup;