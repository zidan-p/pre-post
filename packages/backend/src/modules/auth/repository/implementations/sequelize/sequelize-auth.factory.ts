import { UserModelImplementation } from "~/common/infra/database/sequelize/models/User.model";
import { IAuthCreator } from "../../auth-creator.interface";
import { IUserRepo } from "../../user.repository.port";
import { SequelizeUserRepo } from "./user.repository-impl";





export class SequlizeAuthFactory implements IAuthCreator {

  constructor(
    private readonly model: UserModelImplementation
  ){}

  userRepositoryCreator(): IUserRepo {
    return new SequelizeUserRepo(this.model);
  }


  
}