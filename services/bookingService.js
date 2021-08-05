const { Container } = require("typedi");
const config = require("../config");

class BookingService {
  constructor() {
    this.logger = Container.get("logger");
    this.db = Container.get("db");
    this.CarService = Container.get("CarService");
  }
  async booking({ carId, toDateTime, fromDateTime, userId }) {
    const carServiceInstance = new this.CarService();
    let carDetail = carServiceInstance.getCarById(carId);
    const result = await carServiceInstance.isCarAvailableForBooking({
      carId,
      toDateTime,
      fromDateTime,
    });
    if (!result) return null;
    let bookingResult = await this.db.Booking.create({
      car_id: carId,
      user_id: userId,
      booking_datetime_start: fromDateTime,
      booking_datetime_end: toDateTime,
    });
    return { bookingResult };
  }
}

module.exports = BookingService;
