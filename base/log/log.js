'use strict'
//imports
let _config = require("../../config/config.js")

//intitialization
let log = {}

//logic
log.show = function() {
    for ( let argv = 0 ; argv < arguments.length; argv++ ) {
        if(_config.ENABLE_LOG)
            console.log(arguments[argv])
    }
}

//exports
module.exports = log
