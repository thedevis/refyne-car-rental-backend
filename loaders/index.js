const expressLoader = require('./express');
const { mongoInit } = require('./mongoose');
const Logger = require('./logger');
const events = require('./events');
const dependencyInjectorLoader = require('./dependencyInjector');
async function init({ expressApp: app }) {
    const mongoConnection = await mongoInit();
    Logger.info('✌️ DB loaded and connected!');

    /**
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */
    
    //even we can iterate over the folder of models 
    const taskModel = {
        name: 'taskModel',
        model: require('../models/Task')
    }
    const userModel = {
        name: 'userModel',
        model: require('../models/user')
    }
    dependencyInjectorLoader({
        models: [
            taskModel,
            userModel
            //add as many as model
        ],
        services:require('../services')
    })

    await expressLoader({ expressApp: app });
    Logger.info('✌️ Express loaded');
}
module.exports = init




