'use strict'

/*
* This file is responsible for creating API's
* Written by Ankit Bhagat 10-4-19
*/

//dependencies
var fs = require('fs')
var dir = __dirname + '/../api/';

var actionContent = `'use strict'

class _API_NAME_ {

    async executeAction() {
        let result = {}

        return result;
    }
}

module.exports = _API_NAME_`;

var initializeContent = `'use strict'

class _API_NAME_  {

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

module.exports = _API_NAME_`;

var init = function(){

  //get check if user has passed file Name
  if(process.argv.length < 3){
    console.error("ERROR: Format is node createLibrary.js apiName");
  } else {
    //rename file to camel case
    let apiName = process.argv[2];

    if (fs.existsSync(dir+apiName)){
      console.log("API "+apiName+" already exists")
      process.exit()
    }

    fs.mkdirSync(dir+apiName)

    var api = apiName.split(".");
    var apiNameClassName = api[0] + api[1].charAt(0).toUpperCase() + api[1].slice(1)

    fs.writeFileSync(dir+apiName+"/"+apiName+"Action.js", actionContent.replace(new RegExp("_API_NAME_", 'g'), apiNameClassName+"Action"))
    fs.writeFileSync(dir+apiName+"/"+apiName+"Initialize.js", initializeContent.replace(new RegExp("_API_NAME_", 'g'), apiNameClassName+"Initializer"))

    console.log("API "+apiName+" created")
  }

}

init();
