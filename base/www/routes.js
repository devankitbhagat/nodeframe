'use strict'

/*
This file is reponsible forwarding api requests
*/

//imports
let _config = require("../../config/config.js")
let apiHandler = require("./../apiHandler")
let log = require("../log/log")
let app = require("./server")

//In built routes defined for API's, Admin Panel, Pages
app.all("/api", function(request, response) {

    response.send("API's comming soon")
});

app.all("/rest", function(req, res) {

    let api = new apiHandler( req )
    
    api.executeApiRequest(req)
    .then( response => {
        res.send( response )
    })
    .catch ( error => {
        res.send( error.message )
    })
   
});