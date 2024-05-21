import { Post as PostModel } from "~/common/infra/database/sequelize/models/Post.model";
import { PostImage as PostImageMode } from "~/common/infra/database/sequelize/models/PostImage.model";
import { User as UserModel} from "~/common/infra/database/sequelize/models/User.model";
import { SequelizeMapperFactory } from "../../mappers/sequelize-persistence-mapper/sequelize-mapper.factory";
import { SequelizePostRepoFactory } from "../../repository/implementations/sequelize/sequelize-post.factory";
import { ExpressUseCaseManagerFactory } from "~/common/infra/http/interactor/express.use-case.manager";
import { ExpressMapperFactory, ExpressMapperFactoryWithResourceUrlSerializer } from "../../mappers/express-presenter-mapper/sequelize-mapper.factory";
import { UPDATE_POST, UpdatePostManager } from "../../usecase/update-post ";
import { CREATE_POST, CreatePostManager } from "../../usecase/create-post";
import { DELETE_POST } from "../../usecase/delete-post/delete-post.type";
import { DeletePostManager } from "../../usecase/delete-post/delete-post.manager";
import { GET_ALL_POST, GetAllPostManager } from "../../usecase/get-all-post";




const resourceUrl = new URL("http://localhost:8000");

const postPersistenceMapperFactory = new SequelizeMapperFactory();
const postPresenterMapperFactory = new ExpressMapperFactory();
const postPresenterMapperFactoryWithResourceUrlSerializer = new ExpressMapperFactoryWithResourceUrlSerializer(resourceUrl);

const postRepositoryFactory = new SequelizePostRepoFactory(
  postPersistenceMapperFactory,
  PostImageMode, PostModel, UserModel
);

export const postUseCaseManagerFactory = new ExpressUseCaseManagerFactory();

// create post
postUseCaseManagerFactory.addUseCaseManager(CREATE_POST, new CreatePostManager(postRepositoryFactory));

// update post
postUseCaseManagerFactory.addUseCaseManager(UPDATE_POST, new UpdatePostManager(
  postRepositoryFactory, 
  postPresenterMapperFactoryWithResourceUrlSerializer
))

// delete post
postUseCaseManagerFactory.addUseCaseManager(DELETE_POST, new DeletePostManager(postRepositoryFactory));

// get all post
postUseCaseManagerFactory.addUseCaseManager(GET_ALL_POST, new GetAllPostManager(
  postRepositoryFactory,
  postPresenterMapperFactoryWithResourceUrlSerializer,
))

// get newest post

