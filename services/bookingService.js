const { Container } = require("typedi");
const config = require("../config");

class BookingService {
  constructor() {
    this.logger = Container.get("logger");
    this.db = Container.get("db");
    this.CarService = Container.get("CarService");
  }

  //adding a new booking
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

  //get all the bookings
  async getBookings({}) {
    //FIXME - add pagination logic
    let _fetchAllBooking = `select u.id,u.name,u.mobile_number, b.booking_datetime_start,b.booking_datetime_end  from user
    as u join bookings as b
    on b.user_id=u.id`;

    //DOUBT - will this function return the expired booking also
    return await this.db.sequelize.query(_fetchAllBooking, {
      replacement: {},
      type: this.db.sequelize.QueryTypes.SELECT,
    });
  }

  //get booking detail by user
  async getBookingByUser({ userId }) {
    let _fetchAllBookingByUser = `select u.id,u.name,u.mobile_number, b.booking_datetime_start,b.booking_datetime_end,c.id as carId  from user
as u join bookings as b on b.user_id=u.id join car as c on c.id=b.car_id where u.id=${userId}`;
    const CarService = Container.get('CarService');
    const carServiceInstance = new CarService();
    let _bookings = await this.db.sequelize.query(_fetchAllBookingByUser, {
      replacement: {},
      type: this.db.sequelize.QueryTypes.SELECT,
    });

    for(let booking of _bookings){
      console.log(booking);
      let {price} = await carServiceInstance.getPriceEstimation({carId:booking.carId, fromDateTime:booking.booking_datetime_start, toDateTime:booking.booking_datetime_end});
      booking.price = price;
    }
    return _bookings;
  }
}

module.exports = BookingService;
