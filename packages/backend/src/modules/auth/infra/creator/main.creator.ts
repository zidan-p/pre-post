import { User as UserModel } from "~/common/infra/database/sequelize/models/User.model";
import { ExpressAuthMapperFactory } from "../../mappers/express-user-mapper/express-mapper.factory";
import { SequelizeAuthMapperFactory } from "../../mappers/seqluelize-user-mapper/express-mapper.factory";
import { SequlizeAuthFactory } from "../../repository/implementations/sequelize/sequelize-auth.factory";
import { ExpressUseCaseManagerFactory } from "~/common/infra/http/interactor/express.use-case.manager";
import { LOGIN, LoginManager } from "../../usecase/login";
import { AuthServiceFactory } from "../../service/implementations/auth-service.factory";
import { REFRESH_TOKEN, RefreshTokenManager } from "../../usecase/refresh-token";








const authPersistenceMapperFactory = new SequelizeAuthMapperFactory();
const authPresenterMapperFactory = new ExpressAuthMapperFactory();
const authServiceFactory = new AuthServiceFactory();

const authRepositoryFactory = new SequlizeAuthFactory(
  authPersistenceMapperFactory,
  UserModel
)

export const authUseCaseManagerFactory = new ExpressUseCaseManagerFactory();

authUseCaseManagerFactory.addUseCaseManager(
  LOGIN, 
  new LoginManager(authRepositoryFactory.userRepositoryCreator(), authServiceFactory.createJwtService())
);

authUseCaseManagerFactory.addUseCaseManager(
  REFRESH_TOKEN,
  new RefreshTokenManager(authRepositoryFactory.userRepositoryCreator(), authServiceFactory.createJwtService())
)

