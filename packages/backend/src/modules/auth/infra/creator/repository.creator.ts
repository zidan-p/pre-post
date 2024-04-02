import { User } from "~/common/infra/database/sequelize/models/User.model";
import { SequlizeAuthFactory } from "../../repository/implementations/sequelize/sequelize-auth.factory";


// change it when you want to use another model
const AuthRepositoryCreator = new SequlizeAuthFactory(User);

export const userRepository = AuthRepositoryCreator.userRepositoryCreator();