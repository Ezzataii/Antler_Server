var express = require('express');
var app = express();
var server = require('http').createServer(app);

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
        var idsToSend = message;
        var alildeek = "alildeek";
        idsToSend.array.forEach(element => {
            socket.broadcast.to(socketLookup['element']).emit('deployToClient',alildeek);
        });
    })
})
server.listen(3000);

module.exports.socketLookup = socketLookup;