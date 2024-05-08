import { Mapper } from "~/common/core/Mapper";
import { Entity } from "~/common/domain/entity.base";


// use it or no???
export interface IPostMapperFactory{
  
  createPostMapper<TDomain extends Entity<any>> (): Mapper<TDomain, any>;
  createPostImageMapper<TDomain extends Entity<any>, TRaw extends any> (): Mapper<TDomain, TRaw>;
  createUserMapper<TDomain extends Entity<any>, TRaw extends any> (): Mapper<TDomain, TRaw>;

}