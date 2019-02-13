'use strict'

/*
This file is reponsible for setting up the server at defined port
*/

//imports
let app = require("express")();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let middleware = require('socketio-wildcard')();

let _config = require("../../config/config.js")
let log = require("../log/log")

//logic
io.use(middleware)
app.set("io", io);

http.listen(_config.SERVER_PORT , function () {
    log.show("SERVER RUNNING AT PORT", _config.SERVER_PORT)
});



//export
module.exports = app