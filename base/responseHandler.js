'use strict'
let fs = require("fs")
let staticInstance = null

class ResponseHandler {

    constructor() {
        this.response = JSON.parse(fs.readFileSync(__dirname + "/../i18n/response.en.json").toString());
    }

    static getInstance() {
        if( staticInstance == null ) {
            staticInstance = new ResponseHandler()
        }
        return staticInstance;
    }

    static setResponse( code, optionalMessage ) {
        this.responseCode = ( this.response.hasOwnProperty(code) ) ? code : 1;
        let data = ( responseCode == 1 ) ? {} : data
        let responseMessage = this.response[responseCode]
    }

    buildApiResponse(code, data) {

        let responseCode = ( this.response.hasOwnProperty(code) ) ? code : 1;
        data = ( responseCode == 1 ) ? {} : data
        let responseMessage = this.response[responseCode]

        return {
            "response_code": responseCode,
            "response_data": data,
            "response_message": responseMessage
        }
    }

}

module.exports = ResponseHandler
