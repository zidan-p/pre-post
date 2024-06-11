import { User } from "~/modules/post/domain/user.agreegate-root";
import { IUserRepo, saveStatus } from "../../user.repository.port";
import { UserModelImplementation, User as UserModel } from "~/common/infra/database/sequelize/models/User.model";
import { ISequelizeUserRaw, UserMap } from "~/modules/post/mappers/sequelize-persistence-mapper/user.map";






export class SequelizeUserRepository implements IUserRepo{
  constructor (
    private readonly userMapper: UserMap,
    private readonly userModel: UserModelImplementation
  ) {}

  
  processUserRaw(user: UserModel): ISequelizeUserRaw{
    return user as unknown as ISequelizeUserRaw;
  }

  async exists(id: string): Promise<boolean> {
    
    const user = await this.userModel.findByPk(id);
    return Boolean(user);
  }

  async existsByEmail(userEmail: string): Promise<boolean> {
    
    const user = await this.userModel.findOne({
      where: { email : userEmail}
    });

    return Boolean(user);
  }

  async getUserByUserId(userId: string): Promise<User | null> {
    const user = await this.userModel.findByPk(userId);
    if(!user) return null;
    return this.userMapper.toDomain(this.processUserRaw(user));
  }

  async getUserByUserEmail(email: string ): Promise<User | null> {

    const user = await this.userModel.findOne({
      where: {email: email}
    })

    if(!user) return null;

    return this.userMapper.toDomain(this.processUserRaw(user));
  }


  async getUserByUserName(username: string): Promise<User | null> {

    const user = await this.userModel.findOne({
      where: {username: username}
    })

    if(!user) return null;

    return this.userMapper.toDomain(this.processUserRaw(user));
  }

  async save(user: User): Promise<saveStatus>{
    
    const exists = await this.exists(user.id.toString()); 
    const rawUser = await this.userMapper.toPersistence(user);

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