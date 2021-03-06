const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");
const { Container } = require("typedi");
const middlewares = require("../middlewares");
const userController = require('../controllers/userController');

const route = Router();

module.exports = (app) => {
  app.use("/user", route);
  route.get('/:userId',userController.GetUserById);
  route.get('/',userController.GetUsers);
  route.delete('/:userId',userController.DeleteUser);
  route.get(
    "/:userId/bookings/",
    userController.GetUserBooking
  );
};
