'use strict'

class baseError {
    constructor( errorType, errorCode, errorMessage, errorData ) {
        this.errorType = errorType
        this.errorCode = errorCode
        this.errorMessage = errorMessage
        this.errorData = errorData
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