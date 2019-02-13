'use strict'

let app = require('./www/server')
let io = app.get("io")

class eventHelper {

    static brodcastToSocket( eventName, socketId, data ) {
        io.to( socketId ).emit( eventName, data );
    }

    static brodcastToEveryone( eventName, data ) {
        io.emit( eventName, data );
    }
    
    static addSocketToRoom( socketId, roomName ) {
        io.sockets.connected[socketId].join( roomName );
    }
    
    static brodcastToRoom( eventName, roomName, data ) {
        io.sockets.in( roomName ).emit( eventName, data ) 
    }
    
    static brodcastToNampspace( eventName, nameSpaceName, data ) {
        io.of( nameSpaceName ).emit( eventName, data );
    }
    
    static brodcastToRoomInNameSpace( eventName, nameSpaceName, roomName, data ) {
        io.of( nameSpaceName ).to( roomName ).emit( eventName, data );
    }
    
    static addSocketToRoomInNameSpace( nameSpaceName, socketId, roomName ) {
        io.of( nameSpaceName ).sockets.connected[socketId].join( roomName );
    }
}

module.exports = eventHelper