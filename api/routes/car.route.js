const { celebrate, Joi } = require("celebrate");
const { Router } = require("express");
const { Container } = require("typedi");
const middlewares = require("../middlewares");
const carController = require('../controllers/carController');
const route = Router();
module.exports = (app) => {
  app.use("/car", route);
  route.post('/',carController.CarRegistration);
  route.patch('/:id',carController.CarUpdate)
  route.delete('/:id',carController.DeleteCar)
  route.get(
    "/search-cars",
    carController.CarSearch
  );
  route.get(
    "/:carId/calculate-price",
    carController.GetCarPrice
  );
};
