const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");
const { Container } = require("typedi");
const middlewares = require("../middlewares");
const bookingController = require('../controllers/bookingController');
const route = Router();
module.exports = (app) => {
  app.use("/car", route);
  route.post(
    "/book",
    bookingController.CarBooking
  );
  route.get(
    "/bookings",
    bookingController.FetchAllBookings
  );
};
