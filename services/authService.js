const { Container } = require("typedi");
const { randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config");
const argon2 = require("argon2");
const {
  EventDispatcher,
  EventDispatcherInterface,
} = require("../decorators/EventDispatcher");
const events = require("../subscribers/events");
class AuthService {
  constructor() {
    this.logger = Container.get("logger");
    this.eventDispatcher = EventDispatcherInterface;
    this.UserModel = Container.get("db").User;
  }
  async SignUp(userInputDTO) {
    const salt = randomBytes(32);
    this.logger.silly("Hashing password");
    const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
    this.logger.silly("Creating user db record");
    const userRecord = await this.UserModel.create({
      ...userInputDTO,
      salt: salt.toString("hex"),
      password: hashedPassword,
    });
    this.logger.silly("Generating JWT");
    const user = {
      id:userRecord['id'],
      name:userRecord.name, 
      mobile_number:userRecord.mobile_number 
    }
    const token = this._generateToken(user);

    if (!userRecord) {
      throw new Error("User cannot be created");
    }

    this.logger.silly("sending welcome email");

    //this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });
    //TODO: implement logic of sending email

    return { user, token };
  }
  async SignIn(mobile_number, password) {
    const userRecord = await this.UserModel.findOne({where:{mobile_number:mobile_number}});
    if (!userRecord) {
      throw new Error("User not registered");
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly("Checking password");
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      this.logger.info("Password is valid!");
      this.logger.silly("Generating JWT");

      const user = {
        id:userRecord['id'],
        name:userRecord.name, 
        mobile_number:userRecord.mobile_number 
      }
      const token = this._generateToken(user);
      return { user, token };
    } else {
      throw new Error("Invalid Password");
    }
  }
  async LogOut(userId){
    
  }

  //private method
  _generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        id: user.id, // We are gonna use this in the middleware 'isAuth'
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
}
module.exports = AuthService;
