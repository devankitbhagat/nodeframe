'use strict'

let app = require("./server")
let io = app.get("io")
let path = require("path")
let util = require("./../util.js")

let baseEvent = require('./../baseEvent.js')

app.get('/', function (req, res) {
  res.sendFile(path.resolve('test.html'));
});

io.on('connection', function( socket ) {
  console.log("Some one connected")
  socket.on('*', function( packet ){
    //forward request to event handler
    forwardEventRequest( socket.id, packet )

  });
});

async function forwardEventRequest( clientSocketId, packet ) {
  
  let namespace = packet.nsp;
  let packetData = packet.data;

  let eventName = ( typeof packetData[0] == "string" ) ? packetData[0] : packetData[1]
  let eventData = ( typeof packetData[1] == "object" ) ? packetData[1] : packetData[0]

  eventName = ( typeof eventName == "string" && eventName.length > 0 ) ? 
                util.buildCamelString( eventName, "_" ) : ""
  
  if( eventName.length > 0 && typeof eventData == 'object') {
    let baseExecutor = new baseEvent( namespace, eventName, eventData, clientSocketId )
    
    if( baseExecutor.initializeAction() ) {
      //execute Action
      let result = await baseExecutor.execute()
    }
  }
}