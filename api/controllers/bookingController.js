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
    res.status(201).json(_bookingDetail);
  } catch (error) {
    logger.error(`Error while booking a car - ${error.message}`);
    return next(error);
  }
}
async function FetchAllBookings(req, res, next) {
  //return a list of users who have booked the car along with their durations.
  res.json({ message: "FetchAllBookings" });
}

module.exports = {
  CarBooking,
  FetchAllBookings,
};
