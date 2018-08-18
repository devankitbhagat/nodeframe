

//dependencies
var mysql = require('mysql')
var _dbConfig = require('./config/dbConfig')

//initializations
var db = {}
var connection = false;
var dbConfig = {
  host     : _dbConfig.sql.hosst,
  user     : _dbConfig.sql.user_name,
  password : _dbConfig.sql.password,
  database : _dbConfig.sql.database
}

//methods

//start up method to connect to database
db.init = function(){

  return new Promise((resolve, reject) => {

    try {

      if(typeof dbConfig.database == 'undefined')  throw "Database name not defined"

      connection = mysql.createConnection(dbConfig);
      connection.connect(function(err) {
        if (err) throw err;
        resolve(connection);
      });

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
      setTimeout(() => refreshConnection(), _dbConfig.sql.refresh_connection_interval);
    })

  } catch (e) {
    console.log("SQL CONNECTION: ",e)
  }
}

//exports
module.exports = db;
