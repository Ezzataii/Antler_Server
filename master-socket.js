var socket = require('socket.io-client')("http://localhost:3000",{query: "id=MASTER"});
var socketLookup = require('./socket').socketLookup;

function sendAdsToIds(ids) {
    socket.emit("deployAdsToServer", ids);
}

function sendGraphsToIds(ids) {
    socket.emit("deployGraphsToServer", ids);
}


/*
    Here, we are connecting as a master client on the socket.
    This allows us to pull the initial strings from here.
    Example: deploy.
    More functions could be added here.
*/


module.exports.sendAdsToIds = sendAdsToIds;
module.exports.sendGraphsToIds = sendGraphsToIds;