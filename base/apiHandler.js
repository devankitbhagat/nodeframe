'use strict'

let staticInstance = null;
let BaseError = require("base/error/baseError")
let Authenticator = require("base/authenticator")
let ResponseHandler = require("base/responseHandler")

class apiHandler {

    constructor() {}

    static getInstance() {
        if( staticInstance == null ) {
            staticInstance = new apiHandler()
        }
        return staticInstance
    }

    async executeApiRequest() {

        let apiName = ( this.request.hasOwnProperty("query") &&
                        this.request.query.hasOwnProperty("api_name") ) ? 
                        this.request.query.api_name : ""

        let query = this.request.query
        let actionFile, initializeFile

        if( apiName == "" ) {
            //api not found
            return ResponseHandler.getInstance().buildApiResponse(2, {})
        }

        try {
            actionFile = require("./../api/"+apiName+"/"+apiName+"Action")
            initializeFile = require("./../api/"+apiName+"/"+apiName+"Initialize")
               
        } catch ( err ) {
            return ResponseHandler.getInstance().buildApiResponse(3, {})
        }
    
        let initializer = new initializeFile()
        let action = this.action = new actionFile()

        //if api is secured verify credentials
        if( initializer.isSecured && initializer.isSecured == true ) {
            let userId = ( query.hasOwnProperty("user_id") ) ? query.user_id : 0
            let accessToken = ( query.hasOwnProperty("access_token") ) ? query.access_token : ""

            if( userId == 0 || accessToken == "" ) {
                //user_id and access_token is mandatory parameter for this api 
                return ResponseHandler.getInstance().buildApiResponse(4, {})
            }

            let auth = new authenticator( userId, accessToken )
            let authResponse = await auth.authenticate()

            if( auth.isAllowed == false ) {
                // not allowed to execute api 
                return ResponseHandler.getInstance().buildApiResponse(5, {})
            }

            action['userId'] = userId
            action['accessToken'] = accessToken
        }
        
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
            if( paramData['required'] && typeof query[paramData['name']] == "undefined" ) {
                let baseErrorObj = new baseError( 'EVENT_ERROR', 123, 
                    "MISSING PARAM "+paramData['name'], { data_received: query } )
                
                let errorResponse = baseErrorObj.buildError()
                
                return errorResponse;
            }

            //assign data is available
            if( query[paramData['name']] != "undefined" ) {
                action[paramName] = query[paramData['name']]
            }
            
        }
        
        let actionResponse = await action.executeAction()

        return actionResponse
    }
}

module.exports = apiHandler