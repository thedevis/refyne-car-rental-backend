const { Container } = require("typedi");
async function CarBooking(req, res, next) {
  let logger = Container.get("logger");
  try {
    const bookingInput = req.body;
    bookingInput.fromDateTime = parseInt(bookingInput.fromDateTime);
    bookingInput.toDateTime = parseInt(bookingInput.toDateTime);
    const BookingService = Container.get("BookingService");
    const bookingServiceInstance = new BookingService();
    let _bookingDetail = await bookingServiceInstance.booking(bookingInput);
    if (_bookingDetail) res.status(201).json(_bookingDetail);
    else
      res
        .status(200)
        .json({
          message: "this car is not available for booking for given time slot",
        });
  } catch (error) {
    logger.error(`Error while booking a car - ${error.message}`);
    return next(error);
  }
}
async function FetchAllBookings(req, res, next) {
  let logger = Container.get("logger");
  try {
    const BookingService = Container.get("BookingService");
    const bookingServiceInstance = new BookingService();
    let _bookings = await bookingServiceInstance.getBookings({});
    return res.json(_bookings);
  } catch (error) {
    logger.error(`Error while fetching  all bookings - ${error.message}`);
    return next(error);
  }
}

module.exports = {
  CarBooking,
  FetchAllBookings,
};
