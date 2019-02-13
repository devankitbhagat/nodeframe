'use strict'
//imports
let _config = require("../../config/setting")

//intitialization
let log = {}

//logic
log.show = function() {
    console.log("CALLED", arguments, _config);
    for ( let argv = 0 ; argv < arguments.length; argv++ ) {
        if(_config.ENABLE_LOG)
            console.log(arguments[argv])
    }
}

//exports
module.exports = log