import { Post, PostProps, PostPropsWithId } from "~/modules/post/domain/post.agregate-root";
import { FindAdvanceProps, IPostRepo } from "../../post.repository.port";
import { PostModelImplementation, Post as PostModel } from "~/common/infra/database/sequelize/models/Post.model";
import { SequelizePostImageRepository } from "./post-image.repository-impl";
import { PostImage as PostImageModel} from "~/common/infra/database/sequelize/models/PostImage.model";
import { PostImage } from "~/modules/post/domain/post-image.entity";
import { SequelizeMapperFactory } from "~/modules/post/mappers/sequelize-persistence-mapper/sequelize-mapper.factory";
import { PostMap } from "~/modules/post/mappers/sequelize-persistence-mapper/post.map";
import { PostImageMap } from "~/modules/post/mappers/sequelize-persistence-mapper/post-image.map";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { FilterConfig, OrderByCofig, WhereConfig, WhereInConfig } from "~/common/types/filter-query";
import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { AdvaceObjectMapperConfig, isEmpty, objectAdvanceMap } from "~/common/utils/object";
import { ObjectMapperConfig, ObjectWhereInConfig } from "./post.mapper.config";
import { ArrayablePostSequelize, PostSequelize } from "./post.type";
import { InferAttributes, Op, WhereOptions } from "sequelize";
import { ConvertToPostSequelizeOrderByConfig } from "./post.util";



export class SequelizePostRepository implements IPostRepo {

  private readonly postMapper: PostMap; 
  private readonly objectMapperConfig: AdvaceObjectMapperConfig<PostPropsWithId> = ObjectMapperConfig;
  private readonly objectArrayableMapperConfig: AdvaceObjectMapperConfig<WhereInConfig<PostPropsWithId>> = ObjectWhereInConfig;

  constructor (

    // actually it better to make util type when handling mappper, so oac from mapper and repository can have it's own
    // raw that can be compared by typescript.
    postAppMapper: SequelizeMapperFactory,
    private readonly postModel: PostModelImplementation,
  ) {
    this.postMapper = postAppMapper.createPostMapper() as PostMap;
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

  async findAdvance(agrs: FindAdvanceProps): Promise<Post[]> {

    const where =  agrs.where;
    const whereIncluded = agrs.whereIncluded;
    const whereExcluded = agrs.whereExcluded;
    const orderBy = agrs.orderBy;
    const paginate = agrs.paginate;

    const whereSequelize = where ? objectAdvanceMap(where, this.objectMapperConfig) as PostSequelize : undefined;

    const whereIncludedSequelize = whereIncluded 
      ? objectAdvanceMap(whereIncluded, this.objectArrayableMapperConfig) as ArrayablePostSequelize 
      : undefined;

    const whereExcludedSequelize = whereExcluded 
      ? objectAdvanceMap(whereExcluded, this.objectArrayableMapperConfig) as ArrayablePostSequelize 
      : undefined;

    let sequelizeOrderBy:  OrderByCofig<PostSequelize> | undefined;
    if(orderBy) sequelizeOrderBy = ConvertToPostSequelizeOrderByConfig(orderBy);
      
    // hack for absention of query builder in sequelize
    let sequelizeWhereQuery: WhereOptions<InferAttributes<PostModel>> = {}

    // actually, for in in js still work even when the value is undefined, and of course it will not run it.
    // build query for where equal
    for( const key in whereSequelize) sequelizeWhereQuery[key][Op.eq] = whereSequelize[key];
    
    // build query for inckuded
    for( const key in whereIncludedSequelize) sequelizeWhereQuery[key][Op.in] = whereIncludedSequelize[key];

    // build query for in excluded
    for( const key in whereExcludedSequelize) sequelizeWhereQuery[key][Op.notIn] = whereExcludedSequelize[key];


    // query the post
    const posts = await this.postModel.findAll({where: sequelizeWhereQuery, order: sequelizeOrderBy})

    return posts.map(post => this.postMapper.toDomain(post));
    
  }

  findAdvancePaginate(args: FindAdvanceProps): Promise<IPaginateReponse> {
    throw new Error("Method not implemented.");
  }

  async getPaginate(payload: WhereConfig<PostProps>, paginate: Required<IPaginate>): Promise<IPaginateReponse> {

    const dataPerPage = paginate?.dataPerPage;
    const page = paginate?.page;

    const dataTotal = await this.postModel.count({where: payload});
    let pageTotal = 0;

    if(dataTotal !== 0){
      // a fraction of data per page can be considered 1 page
      pageTotal = Math.ceil(dataTotal / dataPerPage); 
    }

    let hasPreviousPage = false;
    let hasNextPage = false;

    if (page > 0) hasPreviousPage = true;
    if (page < pageTotal) hasNextPage = true; 

    return { dataPerPage, dataTotal, page, pageTotal, hasNextPage, hasPreviousPage}
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