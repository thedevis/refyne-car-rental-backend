const { Container } = require("typedi");
class UserService {
  constructor() {
    this.logger = Container.get("logger");
    this.UserModel = Container.get("db").User;
  }
  async update(userId, userInputDTO) {
    const userObject = await this.UserModel.findOne({
      where: { id: userId },
    });
    if (!userObject) throw new Error(`User not exist`);
    let updatedCarObject = await this.UserModel.update(userInputDTO, {
      where: { id: userId },
    });
    return { updatedCarObject };
  }
  async delete(userId) {
    const userObject = await this.UserModel.update(
      { status: 0 },
      {
        where: { id: userId },
      }
    );
    if (!userObject) return null;
    return 1;
  }
  async getUser(userId) {
    const userObject = await this.UserModel.findOne({
      attributes: ["name", "id"],
      where: { id: userId },
    });
    return userObject ? userObject.dataValues : null;
  }
  async getUsers() {
    const userObject = await this.UserModel.findAll({
      attributes: ["name", "id"],
      where: { status: 1 },
    });
    let users = userObject.reduce((acm, curr) => {
      acm.push(curr.dataValues);
      return acm;
    }, []);
    return users;
  }
}
module.exports = UserService;
