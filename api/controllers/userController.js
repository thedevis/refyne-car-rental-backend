const { Container, ContainerInstance } = require("typedi");
async function UpdateUser(req, res, next) {
    const logger = Container.get('logger');
    try {
        const UserService =  ContainerInstance.get('UserService');

    } catch (error) {
        
    }
}
async function DeleteUser(req, res, next) {
    const logger = Container.get('logger');
    logger.info(`Deleting a user`);
    try {
        let userId = req.params.userId;
        const UserService =   Container.get('UserService');
        const userServiceInstance = new UserService()
        let user = await userServiceInstance.delete(userId);

        if(user) return res.json({message:'user deleted'});
        else res.status(404).json({message:'user not found'});
    } catch (error) {
        logger.error(`Error while fetching a specific user ${error.message}`);
        next(error);
    }
}
async function GetUserById(req, res, next) {
    const logger = Container.get('logger');
    logger.info(`fetching info of a specific user`);
    try {
        let userId = req.params.userId;
        const UserService =   Container.get('UserService');
        const userServiceInstance = new UserService()
        let user = await userServiceInstance.getUser(userId);
        if(user) return res.json(user);
        else res.status(404).json({message:'user not found'})

    } catch (error) {
        logger.error(`Error while fetching a specific user ${error.message}`);
        next(error);
    }
}
async function GetUsers(req, res, next) {
    const logger = Container.get('logger');
    logger.info(`fetching info of a specific user`);
    try {
        const UserService =   Container.get('UserService');
        const userServiceInstance = new UserService();
        let users = await userServiceInstance.getUsers();
        res.json(users);
    } catch (error) {
        logger.error(`Error while fetching users ${error.message}`);
        next(error);
    }
}
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
