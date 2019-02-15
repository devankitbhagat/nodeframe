'use strict'

let staticInstance = null;

class baseError {

    static getInstance() {
        if( staticInstance == null ) {
            staticInstance = new staticInstance()
        }
        return staticInstance
    }

    constructor( errorType, errorCode, errorMessage, errorData ) {
        this.errorType = errorType
        this.errorCode = errorCode
        this.errorMessage = errorMessage
        this.errorData = errorData
    }

    buildApiResponse() {

    }

    buildError() {
        return {
            error_type: this.errorType,
            error_code: this.errorCode,
            error_message: this.errorMessage,
            error_data: this.errorData,
        }
    }
}

module.exports = baseError