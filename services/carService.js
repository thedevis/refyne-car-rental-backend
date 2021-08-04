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
    if (!carObject) return 0;
    let updatedCarObject = await this.CarModel.update(
      { status: 0 },
      {
        where: { id: carId },
      }
    );
    return 1;
  }
  async getCarById(id) {
    return await await this.CarModel.findById(id);
  }
  async getCarByLicenseNumber(licenseNumber) {
    const CarObject =  await this.CarModel.findOne({
      attributes:['base_price','security','currency'],
      where: { car_license_number: licenseNumber },
    });
    if(!CarObject) throw new Error('Licence Number is incorrect');
    console.log(CarObject.dataValues);
    return  CarObject.dataValues 
  }
  async getPriceEstimation({carLicenseNumber, fromDateTime, toDateTime}){
    const carObj = await this.getCarByLicenseNumber(carLicenseNumber);
    if(!carObj) throw new Error('Licence Number is incorrect');
    let timeDiff = Math.abs(new Date(toDateTime) - new Date(fromDateTime)); // millisecond
    
    //millisecond to hour conversion
    const hours = Math.floor(timeDiff / 3600) % 24;
    if(hours <= 0) throw new Error('invalid time range');
    let price = (hours*carObj.base_price)+carObj.security
    return {
      price:price,
      currency:carObj.currency,
      breakup:{
        totalHour:hours,
        basePrice:carObj.base_price,
        securityAmount:carObj.security
      }
    }
  }
}
module.exports = CarService;
