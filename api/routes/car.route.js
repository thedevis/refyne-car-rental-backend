const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");
const { Container } = require("typedi");
const middlewares = require("../middlewares");
const carController = require('../controllers/carController');
const bookingController =  require('../controllers/bookingController')
const route = Router();
module.exports = (app) => {
  app.use("/car", route);
  route.post('/',carController.CarRegistration);
  route.patch('/:carId',carController.CarUpdate)
  route.delete('/:carId',carController.DeleteCar)
  route.get(
    "/search-cars",
    carController.CarSearch
  );
  route.get(
    "/:carId/calculate-price",
    carController.GetPriceEstimation
  );
  route.post('/book',bookingController.CarBooking)
};
