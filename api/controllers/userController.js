const { Container } = require("typedi");
async function UpdateUser(req, res, next) {}
async function DeleteUser(req, res, next) {}
async function GetUserById(req, res, next) {}
async function GetUsers(req, res, next) {}

async function GetUserBooking(req, res, next) {
    const logger = Container.get('logger');
    try {
        let userId = req.params.userId;
        const BookingService = Container.get('BookingService');
        const bookingServiceInstance = new BookingService();
        let bookings = await bookingServiceInstance.getBookingByUser({userId});
        return res.json(bookings);
    } catch(e){
        logger.error(`Error while adding registering car - ${e.message}`);
        return next(e);
    }
}

module.exports = { DeleteUser, UpdateUser, GetUserById, GetUsers,GetUserBooking };
