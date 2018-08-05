/*
* This file is responsible for creating mysql libraries
* Written by Ankit Bhagat 20-07-18
*/

//dependencies
var fs = require('fs')

//Initializations
var fileName = "test";
var extension = ".sqlLib.js"
var orignalFileName = "test";


//methods

//appendDeveloperComments
var appendDeveloperComments = function(callback){
  var comment = "/* \n* This is library file for "+orignalFileName+"\n"
  comment += "* Written By Ankit Bhagat \n */ \n\n"

  writeToFile(comment, function(err, res){
    if(err)
      callback("error")
    else
      callback(null, "success")
  })
}

//append initializations and exports
var appendInitializationAndExport = function(callback){
  var data = "//Initializations\n"
  data += "var lib = {}\n\n"
  data += "//Exports \nmodule.exports = lib \n \n"

  writeToFile(data, function(err, res){
    if(err)
      callback("error")
    else
      callback(null)
  })
}

//append dependencies
var appendDependencies = function(callback){
  var dependencies = "//dependencies \n"
  dependencies += "var queryManager = require('./sqlQueryManager.js')\n\n"

  writeToFile(dependencies, function(err, res){
    if(err)
      callback("error")
    else
      callback(null)
  })
}

//append getList function
var appendGetListMethod = function(callback){
  var data = "//methods\n"
  data += "lib.get"+fileName.charAt(0).toUpperCase()+fileName.slice(1)+"List = function(){\n"
  data += "\treturn new Promise(function(resolve, reject){\n"
  data += "\t\tvar sql = \"SELECT * FROM "+orignalFileName+"\"\n\n"
  data += "\t\tqueryManager.doSelect(sql, {}, function(error, result){\n"
  data += "\t\t\tif(error)\n\t\t\t\treject(error)\n"
  data += "\t\t\telse\n\t\t\t\tresolve(result)\n\t\t})\n"
  data += "\t})\n"
  data += "}\n\n"

  writeToFile(data, function(err, res){
    if(err)
      callback("error")
    else
      callback(null)
  })
}

//append getDetail function
var appendGetDetailMethod = function(callback){
  var data = "lib.get"+fileName.charAt(0).toUpperCase()+fileName.slice(1)+"Detail = function("+fileName+"Id){\n"
  data += "\treturn new Promise(function(resolve, reject){\n"
  data += "\t\tvar sql = \"SELECT * FROM "+orignalFileName+" \"\n"
  data += "\t\t    sql += \"WHERE "+orignalFileName+"_id =:"+fileName+"Id\"\n\n"
  data += "\t\tvar params = {"+fileName+"Id:"+fileName+"Id}\n\n"
  data += "\t\tqueryManager.doSelectOne(sql, params, function(error, result){\n"
  data += "\t\t\tif(error)\n\t\t\t\treject(error)\n"
  data += "\t\t\telse\n\t\t\t\tresolve(result)\n\t\t})\n"
  data += "\t})\n"
  data += "}\n\n"

  writeToFile(data, function(err, res){
    if(err)
      callback("error")
    else
      callback(null)
  })
}

//append insert function
var appendInsertMethod = function(callback){
  var data = "lib.insert"+fileName.charAt(0).toUpperCase()+fileName.slice(1)+" = function(data){\n"
  data += "\treturn new Promise(function(resolve, reject){\n"
  data += "\t\tdata = (typeof(data) == 'object') ? data : {}\n"
  data += "\t\tvar keys = Object.keys(data)\n"
  data += "\t\tvar sql = \"INSERT INTO "+orignalFileName+"\"\n"
  data += "\t\t    sql += \"(\"+keys.join(',')+\") VALUES\"\n"
  data += "\t\t    sql += \"(:\"+keys.join(',:')+\")\"\n\n"

  data += "\t\tqueryManager.doInsert(sql, data, function(error, result){\n"
  data += "\t\t\tif(error)\n\t\t\t\treject(error)\n"
  data += "\t\t\telse\n\t\t\t\tresolve(result)\n\t\t})\n"
  data += "\t})\n"
  data += "}\n\n"

  writeToFile(data, function(err, res){
    if(err)
      callback("error")
    else
      callback(null)
  })
}

//append update function
var appendUpdateMethod = function(callback){
  var data = "lib.update"+fileName.charAt(0).toUpperCase()+fileName.slice(1)+" = function("+fileName+"Id, data){\n"
  data += "\treturn new Promise(function(resolve, reject){\n"
  data += "\t\tdata = (typeof(data) == 'object') ? data : {}\n"
  data += "\t\tvar keys = Object.keys(data)\n"
  data += "\t\tvar sql = \"UPDATE "+orignalFileName+" SET \"\n"
  data += "\t\tfor(var i = 0 ; i < keys.length; i++){\n"
  data += "\t\t\tsql += keys[i]+\"=:\"+keys[i]+\",\"\n"
  data += "\t\t}\n"
  data += "\t\tsql = sql.slice(0, -1) \n"
  data += "\t\tsql += \" WHERE "+orignalFileName+"_id =:"+fileName+"Id\"\n"
  data += "\t\tdata[\""+fileName+"Id\"] = "+fileName+"Id \n\n"
  data += "\t\tqueryManager.doUpdate(sql, data, function(error, result){\n"
  data += "\t\t\tif(error)\n\t\t\t\treject(error)\n"
  data += "\t\t\telse\n\t\t\t\tresolve(result)\n\t\t})\n"
  data += "\t})\n"
  data += "}\n\n"

  writeToFile(data, function(err, res){
    if(err)
      callback("error")
    else
      callback(null)
  })
}

//append Delete function
var appendDeleteMethod = function(callback){
  var data = "//methods\n\n"
  data = "lib.delete"+fileName.charAt(0).toUpperCase()+fileName.slice(1)+" = function("+fileName+"Id){\n"
  data += "\treturn new Promise(function(resolve, reject){\n"
  data += "\t\tvar sql = \"DELETE FROM "+orignalFileName+" \"\n"
  data += "\t\t    sql += \"WHERE "+orignalFileName+"_id =:"+fileName+"Id\"\n\n"
  data += "\t\tvar params = {"+fileName+"Id:"+fileName+"Id}\n\n"
  data += "\t\tqueryManager.doDelete(sql, params, function(error, result){\n"
  data += "\t\t\tif(error)\n\t\t\t\treject(error)\n"
  data += "\t\t\telse\n\t\t\t\tresolve(result)\n\t\t})\n"
  data += "\t})\n"
  data += "}\n\n"

  writeToFile(data, function(err, res){
    if(err)
      callback("error")
    else
      callback(null)
  })
}

var writeToFile = function(content, callback){
  fs.appendFileSync(fileName+extension, content, function(error){
      if(error)
        callback(error)
      else
        callback(null)
    }
  )
}

var init = function(){

  //get check if user has passed file Name
  if(process.argv.length < 3){
    console.error("ERROR: Format is node createLibrary.js library_name");
  } else {
    //rename file to camel case
    orignalFileName = process.argv[2];
    fileName = renameFile(process.argv[2]);

    //write all functions to file
    appendDeveloperComments(function(err){})
    appendInitializationAndExport(function(err){})
    appendDependencies(function(err){})
    appendGetListMethod(function(err){})
    appendGetDetailMethod(function(err){})
    appendInsertMethod(function(err){})
    appendUpdateMethod(function(err){})
    appendDeleteMethod(function(err){})

    console.log("File "+fileName+extension+" created")
  }

}

//returns a name in camelCase format
var renameFile = function(name){

  let camelCaseName = name
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return camelCaseName.charAt(0).toLowerCase()+camelCaseName.slice(1);
}

init();
