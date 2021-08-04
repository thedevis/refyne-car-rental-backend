const { Container } = require("typedi");
class CarService {
  constructor() {
    this.logger = Container.get("logger");
    this.CarModel = Container.get("db").Car;
  }
  async register(carInputDTO) {
    //we can validate the data here also
    try {
      const car = await this.CarModel.create(carInputDTO);
      return { car };
    } catch (e) {
      throw new Error(`Unable to add register a car - ${e.message}`);
    }
  }
  async update(carId, carInputDTO) {
    const carObject = await this.CarModel.findOne({
      where: { id: carId },
    });
    if (!carObject) throw new Error(`CAR not exist`);
    let updatedCarObject = await this.CarModel.update(carInputDTO, {
      where: { id: carId },
    });
    return { updatedCarObject };
  }
  async delete(carId) {
    const carObject = await this.CarModel.findOne({
      where: { id: carId },
    });
    if(!carObject) return 0;
    let updatedCarObject = await this.CarModel.update({status:0}, {
      where: { id: carId },
    });
    return 1;
  }
  async fetch() {}
  async findCar() {}
}
module.exports = CarService;
