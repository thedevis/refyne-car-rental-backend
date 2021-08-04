const { Container } = require('typedi')
class UserService{
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
      async delete(userId, userObject) {
        const userObject = await this.UserModel.findOne({
          where: { id: userId },
        });
        if (!userObject) return 0;
        let updatedUserObject = await this.UserModel.update(
          { status: 0 },
          {
            where: { id: userId },
          }
        );
        return 1;
      }
      async getUser(userId){
        const userObject = await this.UserModel.findOne({
            attributes:['name','id','email'],
            where: { id: userId },
          });
          return {  userObject }
      }
      async getUsers(){
        const userObject = await this.UserModel.findAll({
            attributes:['name','id','email'],
            where: { status: 1 },
          });
          let _userObject = userObject.dataValues;
          return _userObject;
      }

}
module.exports=UserService;
