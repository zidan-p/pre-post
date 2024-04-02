import { UserModelImplementation } from "~/common/infra/database/sequelize/models/User.model";
import { IAuthFactory } from "../../auth-factory.interface";
import { IUserRepo } from "../../user.repository.port";
import { SequelizeUserRepo } from "./user.repository-impl";





export class SequlizeAuthFactory implements IAuthFactory {

  constructor(
    private readonly model: UserModelImplementation
  ){}

  userRepositoryCreator(): IUserRepo {
    return new SequelizeUserRepo(this.model);
  }


  
}