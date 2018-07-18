

//dependencies
var mysql = require('mysql')
var _config = require('config')
var _msg = require('strings')

//initializations
var db = {}
var connection = false;
var connectionRetry = 0;
var dbConfig = {
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
}


//methods

//start up method to connect to database
db.init = function(){

  return new Promise((resolve, reject) => {

    try {
      connection = mysql.createConnection(dbConfig);
      debugInfo("Connected to mysql database", dbConfig.database)
      resolve(connection);
    } catch (e => {
      console.log(_msg.db_connection_error, "SQL CONNECTION: ",e)
      reject(e)
    })

  });
}

//responsible for returning a active connection
db.getConnection = function(){

  return new Promise((resolve, reject) => {

    if(connection)
      resolve(connection)
    else{

      db.init().then((connection) => {
        debugInfo("New sql Database connection created")
        resolve(connection)
      })
      .catch(e => {
        console.log(_msg.db_get_connection_error, "SQL CONNECTION: ",e)
        reject(e)
      })
    }

  })

}

//responsible for executing a query and returning the raw result
db.executeQuery = function(query){

  return new Promise((resolve, reject) => {

    db.getConnection().then(con => {
      con.query(query).then(res => {
        resolve(res)
      })
    })
    .catch(e => {
      console.log(_msg.db_query_execution_error,"SQL CONNECTION: ", query ,e)
      reject(e)
    })

  })
}

db.refreshConnection = function(){

  try {

    if(connection)
      connection.end()

    connection = false;
    db.init.init().then(con => {
      debugInfo("Sql Connection refreshed successfully")
      setTimeOut(db.refreshConnection(), _config.sql_reconnect_delay);
    })

  } catch (e => {
    console.log(_msg.db_refresh_connection_error,"SQL CONNECTION: ",e)
  })
}

//exports
module.exports = db;
