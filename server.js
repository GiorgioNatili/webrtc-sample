// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.configure(function() {
    httpApp.use(express.static(__dirname + "/static/"));
});

// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(8080);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer, {logLevel:"debug", logDateEnable:true});

easyrtc.on("getIceConfig", function(connectionObj, callback){

    var iceConfig = [{url:'stun:192.184.87.98:3478'}];//[{url:'stun:box.sparvoli.com:3478'}];

    iceConfig.push({
      //  'url': tsPacket.uris[i],
        'username': 'giorgionatili',
        'credential': '3uph0n1c0'
    });

    callback(null, iceConfig);

});
