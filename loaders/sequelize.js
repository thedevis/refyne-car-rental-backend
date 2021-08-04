"use strict";
const Sequelize = require("sequelize");
const _ = require("lodash");
const db = {};
const enableLogging = false;
const config = require('../config');
const logger = require('./logger');
// create your instance of sequelize
var sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
  {
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: "mysql",
    timezone: "+05:30",
    logging: console.log,
  }
);
logger.info(`mysql database connected`);
// assign the sequelize variables to the db object and returning the db.
db.Car = require('../models/car')(sequelize, Sequelize);
db.User = require('../models/user')(sequelize, Sequelize);
db.Booking = require('../models/bookings')(sequelize, Sequelize);
module.exports = _.extend(
  {
    sequelize: sequelize,
    Sequelize: Sequelize,
  },
  db
);
