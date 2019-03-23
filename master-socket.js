var socket = require('socket.io-client')("http://localhost:3000",{query: "id=MASTER"});
var socketLookup = require('socket.js').socketLookup;

function sendToIds(ids) {
    socket.emit("deployToServer", ids);
}

module.exports.sendToIds = sendToIds;