const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");
const { Container } = require("typedi");
const middlewares = require("../middlewares");
const authController = require('../controllers/authController');
const route = Router();
module.exports = (app) => {
  app.use("/auth", route);
  route.post(
    "/signup",
    authController.SignUp
  );
  route.post(
    "/login",
    authController.SignIn
  );
  route.post(
    "/logout",
    authController.Logout
  );
};
