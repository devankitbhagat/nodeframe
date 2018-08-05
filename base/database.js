/*
* This file handles mysql database connections and queries.
* Written By Ankit Bhagat
* Date: 08:07:2018
*/

use 'strict';

//dependencies
var _config = require('../config/config')

//declarations
var sqlLib = {};
var connection = false;

//exports
module.exports = sqlLib;

//functions

//This function is responsible for connecting to mysql server
function init(){
  try {
    if(connection)
      return connection;
    else {
      connection = mysql.createConnection(_config.mysql_config);
    }
  } catch(e => {
    // write to the log files
    if(_config.run_mode != 'test'){
      console.log('SQL_DATABASE ERROR:', e);
    }

    //retry connecting to the server

  });
}


function doExecute(){

}
