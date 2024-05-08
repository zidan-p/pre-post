
import { IPostCreator } from "../../post-creator.interface";
import { SequelizePostImageRepository } from "./post-image.repository-impl";
import { SequelizePostRepository } from "./post.repository-impl";
import { SequelizeUserRepository } from "./user.repository-impl";
import { IPostMapperFactory } from "~/modules/post/mappers/post-mapper.factory.interface";
import { PostImageModelImplementation } from "~/common/infra/database/sequelize/models/PostImage.model";
import { PostModelImplementation } from "~/common/infra/database/sequelize/models/Post.model";
import { UserModelImplementation } from "~/common/infra/database/sequelize/models/User.model";





export class SequelizePostFactory implements IPostCreator{

  constructor(
    private readonly postMapperFactory: IPostMapperFactory,
    private readonly postImageModel: PostImageModelImplementation,
    private readonly postModel: PostModelImplementation,
    private readonly userModel: UserModelImplementation
  ){
  }

  createPostImageRepo(){
    return new SequelizePostImageRepository(
      this.postMapperFactory.createPostImageMapper(),
      this.postImageModel
    )
  }
  createPostRepo(){
    return new SequelizePostRepository(
      this.postMapperFactory.createPostMapper(),
      this.postModel,
      this.createPostRepo()
    )
  }

  createUserRepo(){
    return new SequelizeUserRepository(
      this.postMapperFactory.createUserMapper(),
      this.userModel
    )
  }
  
}