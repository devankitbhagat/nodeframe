'use strict'
let baseEventInitializer = require("./../../base/baseEventInitializer") 

class joinRoomInitializer extends baseEventInitializer {
    
    getParameter() {
        let param = {}

        param.param1 = {
            name : "user_id",
            type : "string",
            default : "abc",
            required : true
        }
        
        return param;
    }
}

module.exports = joinRoomInitializer