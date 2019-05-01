var socket = require('socket.io-client')("http://localhost:3000",{query: "id=MASTER"});
var socketLookup = require('./socket').socketLookup;

function sendAdsToIds(req) {
    socket.emit("deployAdsToServer", req);
}

function sendGraphsToIds(req) {
    socket.emit("deployGraphsToServer", req);
}

function sendPsasToIds(json) {
    socket.emit("deployPsasToServer",json);
}

/*
    Here, we are connecting as a master client on the socket.
    This allows us to pull the initial strings from here.
    Example: deploy.
    More functions could be added here.
*/


module.exports.sendAdsToIds = sendAdsToIds;
module.exports.sendGraphsToIds = sendGraphsToIds;
module.exports.sendPsasToIds = sendPsasToIds;