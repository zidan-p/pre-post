import { Post as PostModel } from "~/common/infra/database/sequelize/models/Post.model";
import { PostImage as PostImageMode } from "~/common/infra/database/sequelize/models/PostImage.model";
import { User as UserModel} from "~/common/infra/database/sequelize/models/User.model";
import { SequelizeMapperFactory } from "../../mappers/sequelize-persistence-mapper/sequelize-mapper.factory";
import { SequelizePostRepoFactory } from "../../repository/implementations/sequelize/sequelize-post.factory";
import { ExpressUseCaseManagerFactory } from "~/common/infra/http/interactor/express.use-case.manager";
import { ExpressMapperFactory, ExpressMapperFactoryWithResourceUrlSerializer } from "../../mappers/express-presenter-mapper/sequelize-mapper.factory";
import { UPDATE_POST, UpdatePostManager } from "../../usecase/update/update-post ";
import { CREATE_POST, CreatePostManager } from "../../usecase/create/create-post";
import { DELETE_POST } from "../../usecase/delete/delete-post/delete-post.type";
import { DeletePostManager } from "../../usecase/delete/delete-post/delete-post.manager";
import { GET_ALL_POST } from "../../usecase/get/get-all-post";
import { GET_NEWEST_POST, GetNewestPostManager } from "../../usecase/get/get-newest-post";
import { GET_POSTS_BY_CURRENT_USER, GetPostsByCurrentUserManager } from "../../usecase/get/get-posts-by-current-user";
import { GET_POSTS_BY_OWNER, GetPostsByOwnerManager } from "../../usecase/get/get-posts-by-owner";
import { PUBLISH_POST, PublishPostManager } from "../../usecase/publish/publish-post";
import { UNPUBLISH_POST } from "../../usecase/publish/unpublish-post/unpublish-post.type";
import { UnpublishPostManager } from "../../usecase/publish/unpublish-post/unpublish-post.manager";
import { GET_ALL_PUBLISHED_POSTS, GetAllPublishedPostsManager } from "../../usecase/get/get-all-published-posts";
import { GET_PUBLISHED_POST_BY_OWNER, GetPublishedPostByOwnerManager } from "../../usecase/get/get-published-post-by-owner";
import { GetAllPostManager } from "../../usecase/get/get-all-post";
import { GET_MANY_POSTS, GetManyPostsManager } from "../../usecase/get/get-many-posts";



const APP_URL = process.env.APP_URL;
const resourceUrl = new URL(String(APP_URL)); 

const postPersistenceMapperFactory = new SequelizeMapperFactory();
const postPresenterMapperFactory = new ExpressMapperFactory(resourceUrl);
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

// get many posts
postUseCaseManagerFactory.addUseCaseManager(GET_MANY_POSTS, new GetManyPostsManager(
  postRepositoryFactory,
  postPresenterMapperFactoryWithResourceUrlSerializer
))

// get all published
postUseCaseManagerFactory.addUseCaseManager(GET_ALL_PUBLISHED_POSTS, new GetAllPublishedPostsManager(
  postRepositoryFactory, 
  postPresenterMapperFactoryWithResourceUrlSerializer
))

// get newest post
postUseCaseManagerFactory.addUseCaseManager(GET_NEWEST_POST, new GetNewestPostManager(
  postRepositoryFactory,
  postPresenterMapperFactoryWithResourceUrlSerializer,
))

// get posts by current user
postUseCaseManagerFactory.addUseCaseManager(GET_POSTS_BY_CURRENT_USER, new GetPostsByCurrentUserManager(
  postRepositoryFactory,
  postPresenterMapperFactoryWithResourceUrlSerializer,
));

// get all posts by owner
postUseCaseManagerFactory.addUseCaseManager(GET_POSTS_BY_OWNER, new GetPostsByOwnerManager(
  postRepositoryFactory,
  postPresenterMapperFactoryWithResourceUrlSerializer,
));

postUseCaseManagerFactory.addUseCaseManager(GET_PUBLISHED_POST_BY_OWNER, new GetPublishedPostByOwnerManager(
  postRepositoryFactory,
  postPresenterMapperFactoryWithResourceUrlSerializer,
))

postUseCaseManagerFactory.addUseCaseManager(PUBLISH_POST, new PublishPostManager(
  postRepositoryFactory,
  postPresenterMapperFactoryWithResourceUrlSerializer,
));

postUseCaseManagerFactory.addUseCaseManager(UNPUBLISH_POST, new UnpublishPostManager(
  postRepositoryFactory,
  postPresenterMapperFactoryWithResourceUrlSerializer,
));