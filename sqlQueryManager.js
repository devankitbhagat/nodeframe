/*
* This file is responsible for preparing the queries for execution
* Written By Ankit Bhagat 21-07-18
*/

//dependencies
var mysql = require('mysql')
// var sqlConnectionManager = require('sqlConnectionManager')

//initializations
var queryMethods = {}

//methods

queryMethods.doSelectOne = function(queryString, params, callback){
  prepareQuery(queryString, params, function(error, preparedQuery){
    if(error)
      callback(error)
    else {
      // execute query
      console.log(preparedQuery)
    }
  })
}

queryMethods.doSelect = function(queryString, params, callback){
  prepareQuery(queryString, params, function(error, preparedQuery){
    if(error)
      callback(error)
    else {
      // execute query
      console.log(preparedQuery)
    }
  })
}

queryMethods.doInsert = function(queryString, params, callback){
  prepareQuery(queryString, params, function(error, preparedQuery){
    if(error)
      callback(error)
    else {
      // execute query
      console.log(preparedQuery)
    }
  })
}

queryMethods.doUpdate = function(queryString, params, callback){
  prepareQuery(queryString, params, function(error, preparedQuery){
    if(error)
      callback(error)
    else {
      // execute query
      console.log(preparedQuery)
    }
  })
}

queryMethods.doDelete = function(queryString, params, callback){
  prepareQuery(queryString, params, function(error, preparedQuery){
    if(error)
      callback(error)
    else {
      // execute query
      console.log(preparedQuery)
    }
  })
}

queryMethods.executeMultiple = function(){
  prepareQuery(queryString, params, function(error, preparedQuery){
    if(error)
      callback(error)
    else {
      // execute query
      console.log(preparedQuery)
    }
  })
}

var prepareQuery = function(queryString, params, callback){
  var params = (typeof(params) == 'object') ? params : {};

  //get all keys from params
  var paramKeys = Object.keys(params);

  //loop through all keys and replace keys in query string with values
  for (var i = 0; i < paramKeys.length; i++)
    queryString = queryString.replace(":"+paramKeys[i], mysql.escape(params[paramKeys[i]]))

  //check if user missed to specify value for a query key
  if(queryString.indexOf(':') != -1){
    callback("Missing Value")
  }

  callback(null, queryString)
}

//exports
module.exports = queryMethods;
