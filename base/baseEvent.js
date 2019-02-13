'use strict'
let baseError = require('./error/baseError')
let eventHelper = require('./eventHelper')

class baseEvent{
    
    constructor( nameSpace, eventName, data, clientSocketId ) {
        this.nameSpace = nameSpace
        this.eventName = eventName
        this.data = data
        this.clientSocketId = clientSocketId
    }
    
    initializeAction () {

        //check if event Executor exists
        let actionFile, initializeFile;
        try {
            
            if ( this.nameSpace == '/') {
                actionFile = require("./../events/"+this.eventName+"/"+this.eventName+"Action")
                initializeFile = require("./../events/"+this.eventName+"/"+this.eventName+"Initializer")
            } else {
                actionFile = require("./../events/"+"nsp"+this.nameSpace+"/"+this.eventName+"/"+this.eventName+"Action")
                initializeFile = require("./../events/"+"nsp"+this.nameSpace+"/"+this.eventName+"/"+this.eventName+"Initializer")
            }
            
        } catch ( err ) {
            return false;
        }
        

        let initializer = new initializeFile()
        let action = this.action = new actionFile()
        
        let parameters = initializer.getParameter()
        let paramKeys  = Object.keys(parameters)
   
        for ( let i = 0; i < paramKeys.length; i ++ ) {
            let paramName = paramKeys[i]
            let paramData = parameters[paramName]

            //initialize defualt param if set
            if(paramData['default'] != "") {
                action[paramName] = paramData['default']
            }

            //check if param required is set but missing in data
            if( paramData['required'] && typeof this.data[paramData['name']] == "undefined" ) {
                let baseErrorObj = new baseError( 'EVENT_ERROR', 123, 
                    "MISSING PARAM "+paramData['name'], { data_received: this.data } )
                
                let errorResponse = baseErrorObj.buildError()
                eventHelper.brodcastToSocket( 'node_frame_error', this.clientSocketId, errorResponse )
                return false;
            }

            //assign data is available
            if( this.data[paramData['name']] != "undefined" ) {
                action[paramName] = this.data[paramData['name']]
            }
        }
        
        return true;
    }

    async execute() {
        await this.action.executeAction( this.clientSocketId )
        return true;
    }
}

module.exports = baseEvent