import { SaveStatus, SaveStatusValue } from "~/common/core/save.status";
import { IPaginateReponse } from "~/common/types/paginate";
import { UserEmail } from "~/modules/user/domain/user-email.value-object";
import { UserName } from "~/modules/user/domain/user-name.value-object";
import { User } from "~/modules/user/domain/user.agreegate-root";
import { FindAdvanceProps, IUserRepo } from "../../user.respository.port";
import { UserModelImplementation } from "~/common/infra/database/sequelize/models/User.model";
import { SequelizeUserMapper } from "~/modules/user/mapper/seqluelize-user-mapper/sequelize.mapper";
import { SequelizeUserMapperFactory } from "~/modules/user/mapper/seqluelize-user-mapper/sequelize-mapper.factory";
import { UserSequelizeQueryCreator } from "./user.query-creator";




export class SequelizeUserRepository implements IUserRepo {

  userMapper: SequelizeUserMapper;

  constructor (
    mapperFactory: SequelizeUserMapperFactory,
    private readonly userModel: UserModelImplementation
  ) {
    this.userMapper = mapperFactory.getUserMapper();
  }


  async find(args: FindAdvanceProps): Promise<User[]> {
    const queryCreator = new UserSequelizeQueryCreator(args);
    const query = queryCreator.getBaseQuery();

    const users = await this.userModel.findAll(query);

    return users.map(user => this.userMapper.toDomain(user));
  }


  async findPaginate(args: FindAdvanceProps): Promise<IPaginateReponse> {
    const queryCreator = new UserSequelizeQueryCreator(args);
    const query = queryCreator.getBaseQuery();

    const count = await this.userModel.count(query);

    const paginate = queryCreator.getPaginate(count);


    return paginate;
  }

  /**
   * @todo make it more efficient, use container rather than other method call
   */
  async saveCollection(users: User[]): Promise<SaveStatusValue[]> {
    const resultContainer: SaveStatusValue[] = [];

    for await (const user of users){
      const result = await this.save(user);
      resultContainer.push(result);
    }

    return resultContainer;
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
    if(!user) return null;
    return this.userMapper.toDomain(user);
  }

  async getUserByUserEmail(email: string | UserEmail): Promise<User | null> {
    let emailString: string;
    if(email instanceof UserEmail)
      emailString = email.value;
    else
      emailString = email;
  
    const user = await this.userModel.findOne({
      where: {email: emailString}
    })

    if(!user) return null;

    return this.userMapper.toDomain(user);
  }


  async getUserByUserName(username: string | UserName): Promise<User | null> {
    let usernameString: string;
    if(username instanceof UserName)
      usernameString = username.value;
    else
      usernameString = username;
  
    const user = await this.userModel.findOne({
      where: {username: usernameString}
    })

    if(!user) return null;

    return this.userMapper.toDomain(user);
  }

  async save(user: User): Promise<SaveStatusValue>{
    
    const exists = await this.exists(user.id.toValue()); 
    const rawUser = await this.userMapper.toPersistence(user);

    // delete
    if(user.isDeleted){
      await this.userModel.destroy({where: {id: user.id.toValue()}});
      return SaveStatus.DELETED;
    }

    // created
    if(!exists){
      await this.userModel.create(rawUser);
      return SaveStatus.CREATE;
    }

    // updated
    await this.userModel.update(rawUser, {where: {id: user.id.toValue()}});
    return SaveStatus.UPDATED;
  }

}