const { Container } = require("typedi");
async function CarRegistration(req, res, next) {
  const logger = Container.get("logger");
  try {
    const CarService = Container.get("CarService");
    let input = req.body;
    const carServiceInstance = new CarService();
    const carObject = await carServiceInstance.register(input);
    res.status(201).json(carObject);

  } catch (e) {
    logger.error(`Error while adding registering car - ${e.message}`);
    return next(e);
  }
}
async function CarUpdate(req, res, next) {
  res.json({ message: "CarUpdate" });
}
async function DeleteCar(req, res, next) {
  res.json({ message: "DeleteCar" });
}

async function GetCarDetail(req, res, next) {
  res.json({ message: "GetCarDetail" });
}
async function CarSearch(req, res, next) {
  res.json({ message: "CarSearch" });
}
async function GetCarPrice(req, res, next) {
  res.json({ message: "GetCarPrice" });
}

module.exports = {
  CarRegistration,
  CarUpdate,
  DeleteCar,
  GetCarDetail,
  CarSearch,
  GetCarPrice,
};
