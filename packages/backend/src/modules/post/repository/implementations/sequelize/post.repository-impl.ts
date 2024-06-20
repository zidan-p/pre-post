import { Post, PostProps, PostPropsWithId } from "~/modules/post/domain/post.agregate-root";
import { FindAdvanceProps, IPostRepo } from "../../post.repository.port";
import { PostModelImplementation } from "~/common/infra/database/sequelize/models/Post.model";
import { PostImage as PostImageModel, PostImageModelImplementation} from "~/common/infra/database/sequelize/models/PostImage.model";
import { SequelizeMapperFactory } from "~/modules/post/mappers/sequelize-persistence-mapper/sequelize-mapper.factory";
import { PostMap } from "~/modules/post/mappers/sequelize-persistence-mapper/post.map";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { FilterConfig, WhereConfig, WhereInConfig } from "~/common/types/filter-query";
import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { AdvaceObjectMapperConfig, isEmpty, objectAdvanceMap } from "~/common/utils/object";
import { ObjectMapperConfig, ObjectWhereInConfig } from "./post.mapper.config";
import { PostSequelizeQueryCreator } from "./post.query-creator";
import { PostImageMap } from "~/modules/post/mappers/sequelize-persistence-mapper/post-image.map";



export class SequelizePostRepository implements IPostRepo {

  private readonly postMapper: PostMap; 

  constructor (

    // actually it better to make util type when handling mappper, so oac from mapper and repository can have it's own
    // raw that can be compared by typescript.
    postAppMapper: SequelizeMapperFactory,
    private readonly postModel: PostModelImplementation,
    private readonly postImageModel: PostImageModelImplementation
  ) {
    this.postMapper = postAppMapper.createPostMapper() as PostMap;
  }




  async isInSearch(
    payload: WhereInConfig<PostPropsWithId>, 
    config?: FilterConfig<PostPropsWithId> | undefined
  ): Promise<Post[]> {

    const queryCreator = new PostSequelizeQueryCreator({
      orderBy: config?.orderBy,
      paginate: config?.paginate,
      whereIncluded: payload,
      includes: ["PostImage"]
  });
    const query = queryCreator.getBaseQuery()

    // query the post
    const posts = await this.postModel.findAll(query);

    return posts.map(post => this.postMapper.toDomain(post));
  }


  async countIsInSearch(
    payload: WhereInConfig<PostPropsWithId>, 
    config?: FilterConfig<PostPropsWithId> | undefined
  ): Promise<number> {

    const queryCreator = new PostSequelizeQueryCreator({ 
      orderBy: config?.orderBy, 
      paginate: config?.paginate,
      whereIncluded: payload
    });
    const query = queryCreator.getBaseQuery()

    // query the post
    const postsTotal = await this.postModel.count(query);

    return postsTotal;
  }

  async paginateIsInSearch(
    payload: WhereInConfig<PostPropsWithId>, 
    paginate?: Required<IPaginate> | undefined
  ): Promise<IPaginateReponse> {

    const queryCreator = new PostSequelizeQueryCreator({  
      paginate: paginate,
      whereIncluded: payload
    });
    const query = queryCreator.getBaseQuery()

    // query the post
    const postsTotal = await this.postModel.count(query);

    return queryCreator.getPaginate(postsTotal);
  }

  async isInSearchWhere(
    payloadInQuery: WhereInConfig<PostPropsWithId>, 
    payloadWhereQuery: WhereConfig<PostPropsWithId>, 
    config?: FilterConfig<PostPropsWithId> | undefined
  ): Promise<Post[]> {

    const queryCreator = new PostSequelizeQueryCreator({
      orderBy: config?.orderBy,
      paginate: config?.paginate,
      whereIncluded: payloadInQuery,
      where: payloadWhereQuery
    });
    const query = queryCreator.getBaseQuery()

    // query the post
    const posts = await this.postModel.findAll(query);

    return posts.map(post => this.postMapper.toDomain(post));
  }

  countIsInSearchWhere(
    payloadInQuery: WhereInConfig<PostPropsWithId>, 
    payloadWhereQuery: WhereConfig<PostPropsWithId>, 
    config?: FilterConfig<PostPropsWithId> | undefined
  ): Promise<number> {
    
    const queryCreator = new PostSequelizeQueryCreator({
      orderBy: config?.orderBy,
      paginate: config?.paginate,
      whereIncluded: payloadInQuery,
      where: payloadWhereQuery
    });

    const postCount = this.postModel.count(queryCreator.getBaseQuery());
    return postCount;
  }

  async paginateIsInSearchWhere(
    payloadInQuery: WhereInConfig<PostPropsWithId>, 
    payloadWhereQuery: WhereConfig<PostPropsWithId>, 
    paginate?: Required<IPaginate> | undefined
  ): Promise<IPaginateReponse> {

    const queryCreator = new PostSequelizeQueryCreator({
      paginate: paginate,
      whereIncluded: payloadInQuery,
      where: payloadWhereQuery
    });

    const postCount = await this.postModel.count(queryCreator.getBaseQuery());
    return queryCreator.getPaginate(postCount);
  }

  async deleteMany(postIds: PostId[], limit?: number): Promise<number> {

    const queryCreator = new PostSequelizeQueryCreator({whereIncluded: {postId: postIds}, paginate: {dataPerPage: limit}})

    const result = await this.postModel.destroy(queryCreator.getBaseQuery());

    return result;
  }


  async findAdvance(agrs: FindAdvanceProps): Promise<Post[]> {

    const queryCreator = new PostSequelizeQueryCreator(agrs);
    const query = queryCreator.getBaseQuery();

    // query the post
    const posts = await this.postModel.findAll(query)

    return posts.map(post => this.postMapper.toDomain(post));
    
  }

  async findAdvancePaginate(args: FindAdvanceProps): Promise<IPaginateReponse> {
    const queryCreator = new PostSequelizeQueryCreator(args);
    const query = queryCreator.getBaseQuery()

    const total = await this.postModel.count(query);

    const paginate = queryCreator.getPaginate(total);

    return paginate;

  }

  async getPaginate(payload: WhereConfig<PostProps>, paginate: Required<IPaginate>): Promise<IPaginateReponse> {

    const queryCreator = new PostSequelizeQueryCreator({where: payload, paginate});
    const query = queryCreator.getBaseQuery();

    const total = await this.postModel.count(query);
    return queryCreator.getPaginate(total);
  }


  async find(payload: WhereConfig<PostProps>,config: FilterConfig<PostProps>): Promise<Post[]> {
    const queryCreator = new PostSequelizeQueryCreator({where: payload, paginate: config?.paginate, orderBy: config?.orderBy, includes: ["PostImage"]});
    const query = queryCreator.getBaseQuery();

    const postDocument = await this.postModel.findAll(query);

    const postDomain = postDocument.map(item => this.postMapper.toDomain(item));
    return postDomain;
  }


  async findById(postId: string| PostId): Promise<Post | null> {

    const post = await this.postModel.findByPk(postId.toString(), {
      include: {model: PostImageModel, as: "image"}
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
    
    const exist = await this.exists(post.postId.getStringValue());
    const {image, ...postraw} = this.postMapper.toPersistence(post);

    const image_id = image?.id;

    if(!exist){ // is new
      console.log("is exists..")
      await this.postModel.create({...postraw, image_id});
      if(image_id) await this.postImageModel.update({post_id: postraw.id}, {where: {id: image_id}});

      return 1;
        
    }else{
      console.log("is updated..")
      await this.postModel.update({...postraw, image_id}, {where: {id: post.postId.getStringValue()}});
      if(image_id) await this.postImageModel.update({post_id: postraw.id}, {where: {id: image_id}});
      return 0;
    }


  }

  

}