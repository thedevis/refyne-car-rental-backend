const mongoose = require('mongoose');
const config = require('./../config');
const Logger = require('./../loaders/logger')


let _connection;
async function _connectMongoDb() {
    mongoose.connection.on('connecting', function(){
        Logger.info("Trying to establish a connection to mongo");
    });
    mongoose.connection.on('error', function(error){
        Logger.error(`Error while connecting to mongodb - ${error.message}`);
        process.exit(1);
    });
    mongoose.connection.on('disconnected', function(){
        Logger.warn(`mongo db connection closed`);
    });
    mongoose.connection.on('open', function(){
        Logger.info(`Successfully connected to mongodb ${config.mongoConnectionString}`);
    });
    
    const connectionObj = await mongoose.connect(config.mongoConnectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        poolSize: 500
    });
    _connection = connectionObj.connection.db;
    return connectionObj.connection.db
}
module.exports = {
    mongoInit: _connectMongoDb,
    mongoDbConnection:  ()=>{
        if(_connection) return _connection;
        Logger.warn(`mongo db connection is not available. Please call the mongoInit function`)
    },
}





