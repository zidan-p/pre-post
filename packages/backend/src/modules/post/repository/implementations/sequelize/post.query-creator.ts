import { IQueryCreator } from "~/common/infra/database/sequelize/interface/query-creator.interface";
import { FindAdvanceProps } from "../../post.repository.port";
import { AdvaceObjectMapperConfig, objectAdvanceMap } from "~/common/utils/object";
import { PostPropsWithId } from "~/modules/post/domain/post.agregate-root";
import { OrderByCofig, WhereInConfig } from "~/common/types/filter-query";
import { ObjectMapperConfig, ObjectWhereInConfig } from "./post.mapper.config";
import { ArrayablePostSequelize, PostSequelize } from "./post.type";
import { ConvertToPostSequelizeOrderByConfig } from "./post.util";
import { Post as PostModel } from "~/common/infra/database/sequelize/models/Post.model";
import { Includeable, InferAttributes, Op, WhereOptions } from "sequelize";
import { IPaginateReponse } from "~/common/types/paginate";
import { PostImage } from "~/common/infra/database/sequelize/models/PostImage.model";





export class PostSequelizeQueryCreator implements IQueryCreator {

  private readonly objectMapperConfig: AdvaceObjectMapperConfig<PostPropsWithId> = ObjectMapperConfig;
  private readonly objectArrayableMapperConfig: AdvaceObjectMapperConfig<WhereInConfig<PostPropsWithId>> = ObjectWhereInConfig;

  constructor(
    private query: FindAdvanceProps & {includes?: ("PostImage")[]}
  ){}

  /**
   * 
   * @returns the tranformed query to be consumed by sequelize
   */
  getBaseQuery(){
    const where =  this.query.where;
    const whereIncluded = this.query.whereIncluded;
    const whereExcluded = this.query.whereExcluded;
    const orderBy = this.query.orderBy;
    const dataPerPage = this.query?.paginate?.dataPerPage ? Number(this.query?.paginate?.dataPerPage) : 10;
    const page = this.query?.paginate?.page ? Number(this.query?.paginate?.page) : 1;
    const includes = this.query?.includes ?? [];

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

    // NO, it's wont.. it must be checked first

    // build query for where equal
    for( const key in whereSequelize) {
      if(!sequelizeWhereQuery[key]) sequelizeWhereQuery[key] = {};
      sequelizeWhereQuery[key][Op.eq] = whereSequelize[key];
    };
    
    // build query for included
    for( const key in whereIncludedSequelize) {
      if(!sequelizeWhereQuery[key]) sequelizeWhereQuery[key] = {};
      sequelizeWhereQuery[key][Op.in] = whereIncludedSequelize[key];
    }

    // build query for in excluded
    for( const key in whereExcludedSequelize) {
      if(!sequelizeWhereQuery[key]) sequelizeWhereQuery[key] = {};
      sequelizeWhereQuery[key][Op.notIn] = whereExcludedSequelize[key];
    }

    let sequelizeInclude: Includeable[] = [];
    includes.forEach(item => {
      switch (item) {
        case "PostImage":
          sequelizeInclude.push({
            model: PostImage,
            as: "image"
          })
          break;
      }
    })

    // build paginate
    const limit = dataPerPage;
    const offset = limit * (page - 1);

    return {where: sequelizeWhereQuery, include: sequelizeInclude, order: sequelizeOrderBy, limit, offset, };
  }

  /**
   * 
   * @param dataTotal total count of query result.
   */
  getPaginate(dataTotal: number): IPaginateReponse{
    const dataPerPage = this.query?.paginate?.dataPerPage ?? 10;
    const page = this.query?.paginate?.page ?? 1;

    const limit = dataPerPage;
    const offset = limit * (page - 1);

    let pageTotal = 0;

    if(dataTotal !== 0){
      // a fraction of data per page can be considered 1 page
      pageTotal = Math.ceil(dataTotal / dataPerPage); 
    }

    let hasPreviousPage = false;
    let hasNextPage = false;

    // when the data is zero, that's mean the total page is also zero.
    // because the minimum of current page is 1, i want to make sure it considered valid value.
    if (page > 1 && pageTotal > 0) hasPreviousPage = true;

    if (page < pageTotal ) hasNextPage = true; 

    return { dataPerPage, dataTotal, page, pageTotal, hasNextPage, hasPreviousPage}
  }
}