const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");
const { Container } = require("typedi");
const middlewares = require("../middlewares");
const userController = require('../controllers/user');

const route = Router();

module.exports = (app) => {
  app.use("/user", route);
  route.post(
    "/signup",
    userController.SignupController
  );
};
