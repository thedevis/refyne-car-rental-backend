const { Container } = require("typedi");
const config = require("../config");

class BookingService {
  constructor() {
    this.logger = Container.get("logger");
    this.db = Container.get("db");
    this.CarService = Container.get('CarService');
  }
  async booking({carId,toDateTime,fromDateTime,userId}){
    const carServiceInstance = new this.CarService();
    let carDetail = carServiceInstance.getCarById(carId);
    const result = await carServiceInstance.isCarAvailableForBooking({carId,toDateTime,fromDateTime});
    if(!result) throw new Error(`Car is not available at give time slot`);
    let bookingResult = await this.db.Booking.create({
      car_id:carId,
      user_id:userId,
      booking_datetime_start:fromDateTime,
      booking_datetime_end:toDateTime
    })
    return {bookingResult}
  }

  async getBookings() {
    const Booking = this.db.Booking;
    const query = {
      where: {
        user: this.userId,
      },
      sort: [["created_at", "desc"]],
    };
    return await Booking.findAll(query);
  }

  async book(carId, startDate, endDate) {
    const Booking = this.db.Booking;
    const CarService = Container.get("CarService");

    const isValidBooking = await this._isValidBooking(
      carId,
      startDate,
      endDate
    );

    if (!isValidBooking) {
      throw new Error(
        "Invalid Booking! Car already booked. Please try again later"
      );
    }

    const price = await CarService.getBookingPrice(carId, startDate, endDate);

    const booking = await Booking.create({
      user: this.userId,
      car: carId,
      start_date: startDate,
      end_date: endDate,
      price,
    });

    return booking;
  }

  async _isValidBooking(carId, startDate, endDate) {
    const query = `SELECT true as booking_exist from bookings where
                        car = ${carId} and ('${startDate}' between start_date and end_date 
                        OR '${endDate}' between start_date and end_date) limit 1;`;
    const result = await this.db.sequelize.query(query, {
      types: this.db.Sequelize.QueryTypes.SELECT,
    });

    return result[0].booking_exist;
  }
}

module.exports = BookingService;
