const { Container } = require("typedi");
class CarService {
  constructor() {
    this.CarModel = Container.get("db").Car;
  }
  async register() {}
  async update() {}
  async delete() {}
  async fetch() {}
  async findCar() {}
}
module.exports = CarService;
