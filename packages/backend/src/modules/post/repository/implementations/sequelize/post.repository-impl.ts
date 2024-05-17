import { Post, PostProps } from "~/modules/post/domain/post.agregate-root";
import { IPostRepo } from "../../post.repository.port";
import { PostModelImplementation } from "~/common/infra/database/sequelize/models/Post.model";
import { SequelizePostImageRepository } from "./post-image.repository-impl";
import { PostImage as PostImageModel} from "~/common/infra/database/sequelize/models/PostImage.model";
import { PostImage } from "~/modules/post/domain/post-image.entity";
import { SequelizeMapperFactory } from "~/modules/post/mappers/sequelize-persistence-mapper/sequelize-mapper.factory";
import { PostMap } from "~/modules/post/mappers/sequelize-persistence-mapper/post.map";
import { PostImageMap } from "~/modules/post/mappers/sequelize-persistence-mapper/post-image.map";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { FilterConfig, WhereConfig } from "~/common/types/filter-query";
import { IPaginate, IPaginateReponse } from "~/common/types/paginate";



export class SequelizePostRepository implements IPostRepo {

  private readonly postMapper: PostMap; 

  constructor (

    // actually it better to make util type when handling mappper, so oac from mapper and repository can have it's own
    // raw that can be compared by typescript.
    postAppMapper: SequelizeMapperFactory,
    private readonly postModel: PostModelImplementation,
  ) {
    this.postMapper = postAppMapper.createPostMapper() as PostMap;
  }


  async getPaginate(payload: WhereConfig<PostProps>, paginate: Required<IPaginate>): Promise<IPaginateReponse> {

    const dataPerPage = paginate?.dataPerPage;
    const page = paginate?.page;

    const dataTotal = await this.postModel.count({where: payload});
    let pageTotal = 0;

    if(dataTotal !== 0){
      pageTotal = dataTotal / dataPerPage; 
    }

    return { dataPerPage, dataTotal, page, pageTotal}
  }


  async find(payload: WhereConfig<PostProps>,config: FilterConfig<PostProps>): Promise<Post[]> {
    let offset: number | undefined;
    let limit: number | undefined;

    if(config?.paginate && !isEmpty(config.paginate)){
      offset = config.paginate.page * config.paginate.dataPerPage;
      limit = config.paginate.dataPerPage;
    }

    const postDocument = await this.postModel.findAll({offset, limit, where: payload});
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


  async delete(postId: string | PostId): Promise<void> {
    
    const postStringId = postId.toString();

    const result = await this.postModel.destroy({where: {id: postStringId}});
    return;
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