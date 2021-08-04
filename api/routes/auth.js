const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");
const { Container } = require("typedi");
const AuthService = require("../../services/auth");
const middlewares = require("../middlewares");
const authController = require('../controllers/auth');

const route = Router();

module.exports = (app) => {
  app.use("/auth", route);
  route.post(
    "/signup",
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    authController.SignupController
  );
};
