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
    const logger = Container.get("logger");
    try{
        let carId = req.params.id;
        let data = req.body;
        const CarService = Container.get("CarService");
        const carServiceInstance = new CarService();
        const carObject = await carServiceInstance.update(carId,data);
        res.status(202).json({message:'updated successfully'});

    } catch(e){
        logger.error(`Error while adding registering car - ${e.message}`);
        return next(e);
    }
}
async function DeleteCar(req, res, next) {
    const logger = Container.get("logger");
    try{
        let carId = req.params.id;
        const CarService = Container.get("CarService");
        const carServiceInstance = new CarService();
        const response = await carServiceInstance.delete(carId);
        res.status(200).json(response);

    } catch(e){
        logger.error(`Error while adding registering car - ${e.message}`);
        return next(e);
    }}

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
