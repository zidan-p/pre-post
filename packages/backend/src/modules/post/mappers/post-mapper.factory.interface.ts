import { Mapper, PresenterMapper } from "~/common/core/Mapper";
import { Entity } from "~/common/domain/entity.base";
import { Post } from "../domain/post.agregate-root";



export interface IPostMapperPresenterFactory{
  createPostMapper<TDomain extends Post> (): PresenterMapper<TDomain, any>;
  createPostImageMapper<TDomain extends Post, TRaw extends Record<string, any>> (): PresenterMapper<TDomain, TRaw>;
  createUserMapper<TDomain extends Post, TRaw extends Record<string, any>> (): PresenterMapper<TDomain, TRaw>;
}

export interface IPostMapperFactory{
  
  createPostMapper<TDomain extends Post> (): Mapper<TDomain, any>;
  createPostImageMapper<TDomain extends Post, TRaw extends Record<string, any>> (): Mapper<TDomain, TRaw>;
  createUserMapper<TDomain extends Post, TRaw extends Record<string, any>> (): Mapper<TDomain, TRaw>;

}