import { Mapper, PresenterMapper } from "~/common/core/Mapper";
import { Entity } from "~/common/domain/entity.base";



export interface IPostMapperPresenterFactory{
  createPostMapper<TDomain extends Entity<any>> (): PresenterMapper<TDomain, any>;
  createPostImageMapper<TDomain extends Entity<any>, TRaw extends Record<string, any>> (): PresenterMapper<TDomain, TRaw>;
  createUserMapper<TDomain extends Entity<any>, TRaw extends Record<string, any>> (): PresenterMapper<TDomain, TRaw>;
}

export interface IPostMapperFactory{
  
  createPostMapper<TDomain extends Entity<any>> (): Mapper<TDomain, any>;
  createPostImageMapper<TDomain extends Entity<any>, TRaw extends Record<string, any>> (): Mapper<TDomain, TRaw>;
  createUserMapper<TDomain extends Entity<any>, TRaw extends Record<string, any>> (): Mapper<TDomain, TRaw>;

}