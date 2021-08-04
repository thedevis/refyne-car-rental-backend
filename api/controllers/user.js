const { Container } = require("typedi");
async function SignupController (req, res, next) {
    const logger = Container.get("logger");
    logger.debug("Calling Sign-Up endpoint with body: %o", req.body);
    try {
      let IUserInputDTO = req.body;
      //console.log('is auth service exist', Container.has('AuthService')); - to check Service exist or not
      //load the Service by DI
      const UserService = Container.get('UserService');
      
      //instance of UserService 
      const userServiceInstance = new UserService();

      const { user, token } = await userServiceInstance.SignUp(IUserInputDTO);
      return res.status(201).json({ user, token });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
}
module.exports={
    SignupController
}