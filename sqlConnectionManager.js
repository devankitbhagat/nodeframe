

//dependencies
var mysql = require('mysql')
// var _config = require('config')
// var _msg = require('strings')

//initializations
var db = {}
var connection = false;
var connectionRetry = 0;
var dbConfig = {
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'clamour'
}


//methods

//start up method to connect to database
db.init = function(){

  return new Promise((resolve, reject) => {

    try {
      connection = mysql.createConnection(dbConfig);
      console.log("Connected to mysql database", dbConfig.database)
      resolve(connection);
    } catch (e) {
      console.log("SQL CONNECTION: ",e)
      reject(e)
    }

  });
}

//responsible for returning a active connection
db.getConnection = function(){

  return new Promise((resolve, reject) => {

    if(connection)
      resolve(connection)
    else{

      db.init().then((connection) => {
        console.log("New sql Database connection created")
        resolve(connection)
      })
      .catch(e => {
        console.log("SQL CONNECTION: ",e)
        reject(e)
      })
    }

  })

}

//responsible for executing a query and returning the raw result
db.executeQuery = function(query){

  return new Promise((resolve, reject) => {

    db.getConnection().then(con => {
      console.log("EXECUTING", con)
      con.query(query, function (err, result) {
        resolve(result)
      })
    })
    .catch(e => {
      console.log("SQL CONNECTION: ", query ,e)
      reject(e)
    })

  })
}

refreshConnection = function(){

  try {

    if(connection){
      console.log("ENDING CONNECTION");
      connection.end()
    }

    connection = false;
    db.init().then(con => {
      console.log("Sql Connection refreshed successfully")
      setTimeout(() => refreshConnection(), 10000);
    })

  } catch (e) {
    console.log("SQL CONNECTION: ",e)
  }
}

//exports
module.exports = db;
