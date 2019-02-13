'use strict'
let _config = require("./../config/setting")

class authenticator {

    constructor( userId, accessToken ) {
        this.userId = userId
        this.accessToken = accessToken
    }

    async authenticate() {
        return {
            isAllowed: true,
            errorResponse: {}
        }
    }
}

module.exports = authenticator