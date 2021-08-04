"use strict";
const dotenv = require('dotenv');
const joi = require('joi')

//set the default  environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const envVarsSchema = joi.object({
    NODE_ENV: joi.string()
        .valid('development', 'production', 'test', 'staging')
        .required(),
    PORT: joi.number()
        .required(),
    LOGGER_LEVEL: joi.string()
        .valid('error', 'warn', 'info', 'verbose', 'debug', 'silly')
        .default('info'),
    LOGGER_ENABLED: joi.boolean()
        .truthy('true')
        .falsy('false')
        .default(true),
    JWT_SECRET_KEY:joi.string().required()
}).unknown()
    .required()

const { error, value } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}
module.exports = {

    //web services port number
    port: parseInt(process.env.PORT, 10),

    //mongodb connection string
    mongoConnectionString: process.env.MONGODB_URI,

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'debug',
    },

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
    jwtSecret:process.env.JWT_SECRET_KEY

}

