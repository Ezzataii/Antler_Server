var express = require('express');
var app = express();
var server = require('http').createServer(app);
var adminServices = require('./Functions');
var con = require('./DBcnfg').con;


var io = require('socket.io').listen(server);   // initializes socket server and starts listening.


var socketLookup = {};              //A dictionary of DeviceID => sessionID


io.sockets.on('connection', (socket)=>{
    /*
        Begin session on any connection.
    */
    var DeviceID = socket.request._query['id'];     //the id should be given (useful to keep track of devices)
    var socketID = socket.id;                       //the device's corresponding socketID (sessionID)

    con.query(`UPDATE DEVICE SET status=1 WHERE id=${adminServices.decryptKey(DeviceID)}`);
    io.emit("new-connection", DeviceID);            //notify everyone that a new device connected and update the database. Reason: Live updates on website.

    socketLookup[DeviceID] = socketID;              // add the device to the socket lookup table


    socket.on('disconnect', ()=>{
        /*
            When a device disconnects,
            We remove it from the lookup table
            And we notify the webapp that it disconnected, for live updates
        */
        delete socketLookup[DeviceID];
        console.log("disconnected");
        con.query(`UPDATE DEVICE SET status=0 WHERE id=${adminServices.decryptKey(DeviceID)}`);
        io.emit("device-disconnected", DeviceID);
    })

    socket.on("location",(message)=>{
        if (message.longitude != null && message.latitude != null){
            console.log(`UPDATE DEVICE SET longitude=${message.longitude},latitude=${message.latitude} WHERE id=${adminServices.decryptKey(message.id)})`);
            con.query(`UPDATE DEVICE SET longitude=${message.longitude},latitude=${message.latitude} WHERE id=${adminServices.decryptKey(message.id)}`);
        }
    })

    socket.on('deployPsasToServer',(message) => {
        var idsToSend = JSON.parse(message.devices);
        console.log(idsToSend);
        var writeMode = message.writeMode;
        var psaID = message.psaID;
        var duration = message.psaDuration;
        var text = message.text;
        images = [{id: psaID, duration: duration, type: 'psa', text: text, writeMode: writeMode}];
        console.log(images);
        idsToSend.forEach(device => {
            io.to(socketLookup[device]).emit('deployToClient',images);
        });
    })
    socket.on('deployAdsToServer', (message)=>{
        /*
            When the master client initiates a deploy activity, it means the admin is trying to deploy on the webapp
            The list of devices and images is sent here by the master client.
            We then query the images to get all the information about them, and send them to the devices that they should be 
            received on.
        */
        var idsToSend = message.devices;
        var writeMode = message.writeMode;
        var images = [];
        var query = `SELECT id,Duration FROM ADS WHERE id=${adminServices.decryptKey(message.images[0])}`;
        for (var i = 1 ; i < message.images.length ; i++){
            query += ` OR id=${adminServices.decryptKey(message.images[i])}`;
        }
        console.log(query);
        con.query(query,(err,rows,res)=>{
            for (var i = 0 ; i < rows.length ; i++){
                var image = {};
                image.id = adminServices.encryptKey(rows[i].id);
                image.duration = rows[i].Duration;
                image.type = "ad";
                images.push(image);
            }
            var json = {
                writeMode: writeMode,
                images: images
            }
            idsToSend.forEach(device => {
                io.to(socketLookup[device]).emit('deployToClient',json);
            });
        })
    })

    socket.on("deployGraphsToServer", (message)=>{
        var idsToSend = message.devices;
        var writeMode = message.writeMode;
        var graphs = [];
        var query = `SELECT id,Duration FROM GRAPHS WHERE id = ${adminServices.decryptKey(message.graphs[0])}`;
        for (var i = 1 ; i < message.graphs.length ; i++){
            query += ` OR id=${adminServices.decryptKey(message.graphs[i])}`;
        } 
        con.query(query, (err,rows,result)=>{
            for (var i = 1 ; i < rows.length ; i++) {
                var graph = {};
                graph.id = adminServices.encryptKey(rows[i].id);
                graph.duration = rows[i].Duration;
                graph.type = "graph";
                graphs.push(graph);
            }
            var json = {
                writeMode: writeMode,
                images: graphs
            }
            idsToSend.forEach(device => {
                io.to(socketLookup[device]).emit('deployToClient', graphs);
            });
        })
    })
})
server.listen(3000);

module.exports.socketLookup = socketLookup;