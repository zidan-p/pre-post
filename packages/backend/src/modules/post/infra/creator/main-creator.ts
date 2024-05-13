import { Post as PostModel } from "~/common/infra/database/sequelize/models/Post.model";
import { PostImage as PostImageMode } from "~/common/infra/database/sequelize/models/PostImage.model";
import { User as UserModel} from "~/common/infra/database/sequelize/models/User.model";
import { SequelizeMapperFactory } from "../../mappers/sequelize-persistence-mapper/sequelize-mapper.factory";
import { SequelizePostRepoFactory } from "../../repository/implementations/sequelize/sequelize-post.factory";
import { ExpressUseCaseManagerFactory } from "~/common/infra/http/interactor/express.use-case.manager";
import { ExpressMapperFactory } from "../../mappers/express-presenter-mapper/sequelize-mapper.factory";
import { UPDATE_POST, UpdatePostManager } from "../../usecase/update-post ";
import { CREATE_POST, CreatePostManager } from "../../usecase/create-post";






const postPersistenceMapperFactory = new SequelizeMapperFactory();
const postPresenterMapperFactory = new ExpressMapperFactory();

const postRepositoryFactory = new SequelizePostRepoFactory(
  postPersistenceMapperFactory,
  PostImageMode, PostModel, UserModel
);

export const postUseCaseManagerFactory = new ExpressUseCaseManagerFactory();

postUseCaseManagerFactory.addUseCaseManager(CREATE_POST, new CreatePostManager(postRepositoryFactory));
postUseCaseManagerFactory.addUseCaseManager(UPDATE_POST, new UpdatePostManager(postRepositoryFactory));
