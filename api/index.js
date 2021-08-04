const { Router } = require('express');
const authRequestHandler = require('./routes/auth.route');
const bookingRequestHandler = require('./routes/booking.route');
const userRequestHandler = require('./routes/user.route');
const carRequestHandler = require('./routes/car.route');
module.exports=()=>{
    const app = Router();
    authRequestHandler(app);
    bookingRequestHandler(app);
    userRequestHandler(app);
    carRequestHandler(app);
    return app;
}
