import { UserModelImplementation } from "~/common/infra/database/sequelize/models/User.model";
import { IUserRepoFactory } from "../../user.repository.factory";
import { SequelizeUserRepository } from "./user.repository";
import { SequelizeUserMapperFactory } from "~/modules/user/mapper/seqluelize-user-mapper/sequelize-mapper.factory";





export class SequelizeUserCachedFactory implements IUserRepoFactory {
  
  private readonly userRepo: SequelizeUserRepository
  constructor(
    userMapperFactory: SequelizeUserMapperFactory,
    userModel: UserModelImplementation
  ){
    this.userRepo = new SequelizeUserRepository(userMapperFactory, userModel);
  }

  getUserRepo(){
    return this.userRepo;
  }
}