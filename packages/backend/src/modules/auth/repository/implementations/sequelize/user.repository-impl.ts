import { Model } from "sequelize";
import { IUserRepo, saveStatus } from "../../user.repository.port";
import { UserModelImplementation, User as UserModel } from "~/common/infra/database/sequelize/models/User.model";
import { UserEmail } from "~/modules/auth/domain/user-email.value-object";
import { UserName } from "~/modules/auth/domain/user-name.value-object";
import { User } from "~/modules/auth/domain/user.agregate-root";
import { IUserRaw, UserMap } from "~/modules/auth/mappers/user.mapper";



export class SequelizeUserRepo implements IUserRepo {


  constructor (
    private readonly userModel: UserModelImplementation
  ) {}

  
  processUserRaw(user: UserModel): IUserRaw{
    return user as unknown as IUserRaw;
  }

  async exists(id: string | number): Promise<boolean> {
    
    const user = await this.userModel.findByPk(id);
    return Boolean(user);
  }

  async existsByEmail(userEmail: UserEmail): Promise<boolean> {
    
    const user = await this.userModel.findOne({
      where: { email : userEmail.value}
    });

    return Boolean(user);
  }

  async getUserByUserId(userId: string): Promise<User | null> {
    const user = await this.userModel.findByPk(userId);
    return UserMap.toDomain(this.processUserRaw(user));
  }

  async getUserByUserEmail(email: string | UserEmail): Promise<User> {
    let emailString: string;
    if(email instanceof UserEmail)
      emailString = email.value;
    else
      emailString = email;
  
    const user = await this.userModel.findOne({
      where: {email: emailString}
    })

    return UserMap.toDomain(this.processUserRaw(user));
  }


  async getUserByUserName(username: string | UserName): Promise<User> {
    let usernameString: string;
    if(username instanceof UserName)
      usernameString = username.value;
    else
      usernameString = username;
  
    const user = await this.userModel.findOne({
      where: {username: usernameString}
    })

    return UserMap.toDomain(this.processUserRaw(user));
  }

  async save(user: User): Promise<saveStatus>{
    
    const exists = await this.exists(user.id.toValue()); 
    const rawUser = await UserMap.toPersistence(user);

    // created
    if(!exists){
      await this.userModel.create(rawUser as unknown as UserModel);
      return 1;
    }

    // updated
    await this.userModel.update(rawUser as unknown as UserModel, {where: {id: user.id.toValue()}});
    return 0;
  }


  


}