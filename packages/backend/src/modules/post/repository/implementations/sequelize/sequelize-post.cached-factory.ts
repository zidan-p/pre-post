
import { IPostFactory } from "../../post-creator.interface";
import { SequelizePostImageRepository } from "./post-image.repository-impl";
import { SequelizePostRepository } from "./post.repository-impl";
import { SequelizeUserRepository } from "./user.repository-impl";
import { IPostMapperFactory } from "~/modules/post/mappers/post-mapper.factory.interface";
import { PostImageModelImplementation } from "~/common/infra/database/sequelize/models/PostImage.model";
import { PostModelImplementation } from "~/common/infra/database/sequelize/models/Post.model";
import { UserModelImplementation } from "~/common/infra/database/sequelize/models/User.model";
import { IUserRepo } from "../../user.repository.port";





export class SequelizePostFactory implements IPostFactory{

  private postImageRepo: SequelizePostImageRepository;
  private postRepo: SequelizePostRepository;
  private userRepo: IUserRepo;

  constructor(
    private readonly postMapperFactory: IPostMapperFactory,
    private readonly postImageModel: PostImageModelImplementation,
    private readonly postModel: PostModelImplementation,
    private readonly userModel: UserModelImplementation
  ){
    this.postImageRepo = new SequelizePostImageRepository(
      postMapperFactory.createPostImageMapper(),
      this.postImageModel
    );

    this.postRepo = new SequelizePostRepository(
      this.postMapperFactory.createPostMapper(),
      this.postModel,
      this.postImageRepo
    );

    this.userRepo = new SequelizeUserRepository(
      this.postMapperFactory.createUserMapper(),
      this.userModel
    );
  }

  createPostImageRepo(){ return this.postImageRepo }
  createPostRepo(){return this.postRepo}
  createUserRepo(){return this.userRepo}
  
}