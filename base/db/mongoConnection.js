let staticInstance = null;

class MongooseConnection {
    constructor() {
        this.mongoose = require("mongoose")
        this.isConnected = false
    }

    static getInstance() {
        if( staticInstance === null ) {
            staticInstance = new MongooseConnection()
        }
        return staticInstance;
    }

    createConnection() {
        return new Promise( (resolve, reject) => {
            this.mongoose.connect('mongodb://127.0.0.1:27017/my_db');
            var db = this.mongoose.connection;
            db.on('error', function( error ) {
                this.isConnected = false
                reject( error )
            });

            db.once('open', function() {
                this.isConnected = true
                resolve()
            });
        })
    }

    getConnection() {
        return ( this.isConnected ) ? this.mongoose : false;
    }
}

module.exports = MongooseConnection;
