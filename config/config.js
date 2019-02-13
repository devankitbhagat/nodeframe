//declarations
var config = {};

//exports
module.exports = config;

config.SERVER_PORT = 3000;
config.ENABLE_LOG = true; // true to enable 
config.RUN_MODE = 'test'; //test or production

//mysql configs
config.sql = {}
config.sql.host = 'localhost';
config.sql.user_name = 'root';
config.sql.password = 'password';
config.sql.database = 'clamour';
config.sql.max_retry = 0;
config.sql.refresh_connection_interval = 10000; //in seconds