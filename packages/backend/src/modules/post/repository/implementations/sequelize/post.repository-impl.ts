import { Post } from "~/modules/post/domain/post.agregate-root";
import { IPostRepo, saveStatus } from "../../post.repository.port";
import { PostModelImplementation } from "~/common/infra/database/sequelize/models/Post.model";
import { SequelizePostImageRepository } from "./post-image.repository-impl";
import { SequelizePostMapper } from "~/modules/post/mappers/sequelize-mapper/post.map";





export class SequelizePostRepository implements IPostRepo {


  constructor (

    // actually it better to make util type when handling mappper, so oac from mapper and repository can have it's own
    // raw that can be compared by typescript.
    private readonly postMapper: SequelizePostMapper,
    private readonly postModel: PostModelImplementation,
    private readonly postImageRepository: SequelizePostImageRepository
  ) {}

  async exists(postId: string): Promise<boolean> {
    
    const post = await this.postModel.findByPk(postId);
    return Boolean(post);
  }


  async save(post: Post): Promise<saveStatus> {
    
    const exist = this.exists(post.postId.getStringValue());
    const {image, ...postraw} = this.postMapper.toPersistence(post);

    if(!exist){ // is new
      await this.postModel.create(postraw);
      return 1;
        
    }else{
      await this.postModel.update(postraw, {where: {id: post.postId.getStringValue()}});
      return 0;
    }
  }

}