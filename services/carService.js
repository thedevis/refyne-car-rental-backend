const { Container } = require("typedi");
class CarService {
  constructor() {
    this.logger = Container.get("logger");
    this.CarModel = Container.get("db").Car;
  }
  async register(userInputDTO) {
    //we can validate the data here also
    try {
      const car = await this.CarModel.create(userInputDTO);
      return { car }
    } catch(e){
      throw new Error(`Unable to add register a car - ${e.message}`)
    }
  }
  async update() {}
  async delete() {}
  async fetch() {}
  async findCar() {}
}
module.exports = CarService;
