'use strict'

class userGetInitializer  {

    getParameter() {
        let param = {}

        param.param1 = {
            name : "user_id",
            type : "string",
            default : "abc",
            required : true
        }

        param.param2 = {
            name : "name",
            type : "string",
            default : "abc",
            required : true
        }

        return param;
    }
}

module.exports = userGetInitializer
