module.exports = [
  {
    name: "UserService",
    service: require('./userService'),
  },
  {
    name:'AuthService',
    service:require('./authService')
  },
  {
    name:'CarService',
    service:require('./carService')
  },
  {
    name:'BookingService',
    service:require('./bookingService')
  },
];
