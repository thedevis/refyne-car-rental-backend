const { Container } = require("typedi");
async function SignUp(req, res, next) {
  const logger = Container.get("logger");
  logger.debug("Calling Sign-Up endpoint with body: %o", req.body);
  try {
    let IUserInputDTO = req.body;
    //console.log('is auth service exist', Container.has('AuthService')); - to check Service exist or not
    //load the Service by DI
    const AuthService = Container.get("AuthService");

    //instance of AuthService
    const authServiceInstance = new AuthService();

    const { user, token } = await authServiceInstance.SignUp(IUserInputDTO);
    return res.status(201).json({ user, token });
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return next(e);
  }
}
async function SignIn(req, res, next) {
  const logger = Container.get("logger");
  logger.debug("Calling Sign-Up endpoint with body: %o", req.body);
  try {
    let body = req.body;

    //load the Service by DI
    const AuthService = Container.get("AuthService");

    //instance of AuthService
    const authServiceInstance = new AuthService();

    const { user, token } = await authServiceInstance.SignIn(
      body.mobile_number,
      body.password
    );
    return res.status(201).json({ user, token });
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return next(e);
  }
}
async function Logout(req, res, next) {
  const logger = Container.get("logger");
  logger.debug("Calling Sign-Up endpoint with body: %o", req.body);
  try {
    let body = req.body;

    //load the Service by DI
    const AuthService = Container.get("AuthService");

    //instance of AuthService
    const authServiceInstance = new AuthService();

    const { user, token } = await authServiceInstance.SignIn(
      body.mobile_number,
      body.password
    );
    return res.status(201).json({ user, token });
  } catch (e) {
    logger.error("🔥 error: %o", e);
    return next(e);
  }

  res.json({ message: "logout operation" });
}
module.exports = {
  SignUp,
  SignIn,
  Logout,
};
