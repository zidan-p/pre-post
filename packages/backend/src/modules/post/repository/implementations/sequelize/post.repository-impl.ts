import { Post } from "~/modules/post/domain/post.agregate-root";
import { FindConfig, IPostRepo } from "../../post.repository.port";
import { PostModelImplementation } from "~/common/infra/database/sequelize/models/Post.model";
import { SequelizePostImageRepository } from "./post-image.repository-impl";
import { PostImage as PostImageModel} from "~/common/infra/database/sequelize/models/PostImage.model";
import { PostImage } from "~/modules/post/domain/post-image.entity";
import { SequelizeMapperFactory } from "~/modules/post/mappers/sequelize-persistence-mapper/sequelize-mapper.factory";
import { PostMap } from "~/modules/post/mappers/sequelize-persistence-mapper/post.map";
import { PostImageMap } from "~/modules/post/mappers/sequelize-persistence-mapper/post-image.map";
import { PostId } from "~/modules/post/domain/post-id.value-object";



export class SequelizePostRepository implements IPostRepo {

  private readonly postMapper: PostMap; 
  private readonly postImageMapper: PostImageMap;

  constructor (

    // actually it better to make util type when handling mappper, so oac from mapper and repository can have it's own
    // raw that can be compared by typescript.
    postAppMapper: SequelizeMapperFactory,
    private readonly postModel: PostModelImplementation,
  ) {
    this.postMapper = postAppMapper.createPostMapper() as PostMap;
    this.postImageMapper = postAppMapper.createPostImageMapper() as PostImageMap;
  }


  async find(config: FindConfig): Promise<Post[]> {
    let offset: number | undefined;
    let limit: number | undefined;

    if(config?.paginate && !isEmpty(config.paginate)){
      offset = config.paginate.page * config.paginate.dataPerPage;
      limit = config.paginate.dataPerPage;
    }

    const postDocument = await this.postModel.findAll({offset, limit});
    const postDomain = postDocument.map(item => this.postMapper.toDomain(item));
    return postDomain;
  }


  async findById(postId: string| PostId): Promise<Post | null> {

    const post = await this.postModel.findByPk(postId.toString(), {
      include: PostImageModel
    });

    if(!post) return null;

    const postDomain = this.postMapper.toDomain(post);
    return postDomain;
  }

  async exists(postId: string): Promise<boolean> {
    
    const post = await this.postModel.findByPk(postId);
    return Boolean(post);
  }


  async save(post: Post) {
    
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