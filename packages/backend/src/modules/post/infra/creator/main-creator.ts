import { Post as PostModel } from "~/common/infra/database/sequelize/models/Post.model";
import { PostImage as PostImageMode } from "~/common/infra/database/sequelize/models/PostImage.model";
import { User as UserModel} from "~/common/infra/database/sequelize/models/User.model";
import { SequelizeMapperFactory } from "../../mappers/sequelize-mapper/sequelize-mapper.factory";
import { SequelizePostFactory } from "../../repository/implementations/sequelize/sequelize-post.factory";
import { CreatePostManager } from "../../usecase/create-post/create-post.manager";
import { CREATE_POST } from "../../usecase/create-post/create-post.type";
import { ExpressUseCaseManagerFactory } from "./express-use-case-manager";






const postMapperFactory = new SequelizeMapperFactory();


const postRepositoryFactory = new SequelizePostFactory(
  postMapperFactory,
  PostImageMode, PostModel, UserModel
);

export const postUseCaseManagerFactory = new ExpressUseCaseManagerFactory();


postUseCaseManagerFactory.addUseCaseManager(CREATE_POST, new CreatePostManager(postRepositoryFactory));