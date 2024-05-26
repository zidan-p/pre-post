import { Post, PostProps, PostPropsWithId } from "~/modules/post/domain/post.agregate-root";
import { IPostRepo } from "../../post.repository.port";
import { PostModelImplementation } from "~/common/infra/database/sequelize/models/Post.model";
import { SequelizePostImageRepository } from "./post-image.repository-impl";
import { PostImage as PostImageModel} from "~/common/infra/database/sequelize/models/PostImage.model";
import { PostImage } from "~/modules/post/domain/post-image.entity";
import { SequelizeMapperFactory } from "~/modules/post/mappers/sequelize-persistence-mapper/sequelize-mapper.factory";
import { PostMap } from "~/modules/post/mappers/sequelize-persistence-mapper/post.map";
import { PostImageMap } from "~/modules/post/mappers/sequelize-persistence-mapper/post-image.map";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { FilterConfig, WhereConfig, WhereInConfig } from "~/common/types/filter-query";
import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { AdvaceObjectMapperConfig, isEmpty } from "~/common/utils/object";


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


  private readonly objectMapperConfig: AdvaceObjectMapperConfig<PostPropsWithId> = {
    postId: {
      outKey: "id",
      mapper: (id) => id.getStringValue(),
    },
    dateTimeCreated: {
      outKey: "date_time_created",
      mapper: (date) => date
    },
    dateTimePosted: {
      outKey: "date_time_posted"
    },
    isPublised: {
      outKey: "is_published"
    },
    ownerId: {
      outKey: "owner_id",
      mapper: (id) => id.getStringValue()
    },
    postContent: {
      outKey: "content",
      mapper: (content) => content.value
    },
    postImageManager: {
      outKey: "image_id",
      mapper: (singeImageManager) => {
        const image = singeImageManager.getImage;
        if(!image) return null;
        return image.id.toString()
      }
    },
    postTitle: {
      outKey: "title",
      mapper: title => title.value
    }
  }


  isInSearch(payload: WhereInConfig<PostPropsWithId>, config?: FilterConfig<PostPropsWithId> | undefined): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  countIsInSearch(payload: WhereInConfig<PostPropsWithId>, config?: FilterConfig<PostPropsWithId> | undefined): Promise<number> {
    throw new Error("Method not implemented.");
  }
  paginateIsInSearch(payload: WhereInConfig<PostPropsWithId>, paginate?: Required<IPaginate> | undefined): Promise<IPaginateReponse> {
    throw new Error("Method not implemented.");
  }
  isInSearchWhere(payloadInQuery: WhereInConfig<PostPropsWithId>, payloadWhereQuery: WhereConfig<PostPropsWithId>, config?: FilterConfig<PostPropsWithId> | undefined): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  countIsInSearchWhere(payloadInQuery: WhereInConfig<PostPropsWithId>, payloadWhereQuery: WhereConfig<PostPropsWithId>, config?: FilterConfig<PostPropsWithId> | undefined): Promise<number> {
    throw new Error("Method not implemented.");
  }
  paginateIsInSearchWhere(payloadInQuery: WhereInConfig<PostPropsWithId>, payloadWhereQuery: WhereConfig<PostPropsWithId>, paginate?: Required<IPaginate> | undefined): Promise<number> {
    throw new Error("Method not implemented.");
  }
  deleteMany(postIds: string[] | PostId[]): Promise<number> {
    throw new Error("Method not implemented.");
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