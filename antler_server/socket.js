var express = require('express');
var app = express();
var server = require('http').createServer(app);
var adminServices = require('./Functions');
var con = require('./DBcnfg').con;
var socketLookup = {};

app.get("/tcp/get/alive",(req,res)=>{
    res.end(JSON.stringify(socketLookup));
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', (socket)=>{
    var DeviceID = socket.request._query['id'];
    var socketID = socket.id;
    socket.emit("new-connection", DeviceID);
    con.query(`UPDATE DEVICE SET status=1 WHERE id=${adminServices.decryptKey(DeviceID)}`);

    socketLookup[DeviceID] = socketID;


    socket.on('disconnect', ()=>{
        delete socketLookup[DeviceID];
        console.log("disconnected");
        con.query(`UPDATE DEVICE SET status=0 WHERE id=${adminServices.decryptKey(DeviceID)}`);
        io.emit("device-disconnected", DeviceID);
    })

    


    socket.on('deployToServer', (message)=>{
        var idsToSend = message.devices;
        var images = [];
        var query = `SELECT id,Duration FROM ADS WHERE id=${adminServices.decryptKey(message.images[0])}`;
        for (var i = 1 ; i < message.images.length ; i++){
            query += ` OR id=${adminServices.decryptKey(message.images[i])}`;
        }
        con.query(query,(err,rows,res)=>{
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