import { IQueryCreator } from "~/common/infra/database/sequelize/interface/query-creator.interface";
import { FindAdvanceProps } from "../../post.repository.port";
import { AdvaceObjectMapperConfig, objectAdvanceMap } from "~/common/utils/object";
import { PostPropsWithId } from "~/modules/post/domain/post.agregate-root";
import { OrderByCofig, WhereInConfig } from "~/common/types/filter-query";
import { ObjectMapperConfig, ObjectWhereInConfig } from "./post.mapper.config";
import { ArrayablePostSequelize, PostSequelize } from "./post.type";
import { ConvertToPostSequelizeOrderByConfig } from "./post.util";
import { Post as PostModel } from "~/common/infra/database/sequelize/models/Post.model";
import { InferAttributes, Op, WhereOptions } from "sequelize";
import { IPaginateReponse } from "~/common/types/paginate";





export class PostSequelizeQueryCreator implements IQueryCreator {

  private readonly objectMapperConfig: AdvaceObjectMapperConfig<PostPropsWithId> = ObjectMapperConfig;
  private readonly objectArrayableMapperConfig: AdvaceObjectMapperConfig<WhereInConfig<PostPropsWithId>> = ObjectWhereInConfig;

  constructor(
    private query: FindAdvanceProps
  ){}

  getBaseQuery(){
    const where =  this.query.where;
    const whereIncluded = this.query.whereIncluded;
    const whereExcluded = this.query.whereExcluded;
    const orderBy = this.query.orderBy;
    const dataPerPage = this.query?.paginate?.dataPerPage ?? 10;
    const page = this.query?.paginate?.page ?? 1;

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

    // build paginate
    const limit = dataPerPage;
    const offset = limit * (page - 1);

    return {where: sequelizeWhereQuery, order: sequelizeOrderBy, limit, offset}
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

    if (page > 0) hasPreviousPage = true;
    if (page < pageTotal) hasNextPage = true; 

    return { dataPerPage, dataTotal, page, pageTotal, hasNextPage, hasPreviousPage}
  }
}