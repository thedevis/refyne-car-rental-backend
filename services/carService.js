const { Container } = require("typedi");
class CarService {
  constructor() {
    this.logger = Container.get("logger");
    this.CarModel = Container.get("db").Car;
    this.db = Container.get("db");
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
    let carObject =  await this.CarModel.findByPk(id);
    if(!carObject)  throw new Error(`invalid car`);
    return carObject.dataValues;

  }
  async getCarByLicenseNumber(licenseNumber) {
    const CarObject =  await this.CarModel.findOne({
      where: { car_license_number: licenseNumber },
    });
    if(!CarObject) throw new Error('Licence Number is incorrect');
    console.log(CarObject.dataValues);
    return  CarObject.dataValues 
  }
  async getPriceEstimation({carId, fromDateTime, toDateTime}){
    const carObj = await this.CarModel.findByPk(carId);
    if(!carObj) throw new Error('Car Id is incorrect');
    let timeDiff = Math.abs(new Date(toDateTime) - new Date(fromDateTime)); // millisecond
    
    //millisecond to hour conversion
    const hours = Math.floor(timeDiff / 3600) % 24;
    if(hours <= 0) throw new Error('invalid time range');
    let price = (hours*carObj.base_price)+carObj.security
    return {
      carId:carId,
      price:price,
      currency:carObj.currency,
      breakup:{
        totalHour:hours,
        basePrice:carObj.base_price,
        securityAmount:carObj.security
      }
    }
  }
  async isCarAvailableForBooking({carId,fromDateTime, toDateTime}){
    let _fromDateTime = new Date(fromDateTime).toISOString().slice(0, 19).replace('T', ' ');
    let _toDateTime = new Date(toDateTime).toISOString().slice(0, 19).replace('T', ' ');
    let _queryToGetBooking = `select * from bookings where carId=${carId} and   booking_datetime_start  between '${_fromDateTime}' and '${_toDateTime}' and booking_datetime_end between '${_fromDateTime}' and '${_toDateTime}' and status=1`;
    const bookingResult =await this.db.sequelize.query('select * from bookings ', {
      replacement:{},
      type:this.db.sequelize.QueryTypes.SELECT
    })
    return bookingResult.length ? false : true;
  }
}
module.exports = CarService;
