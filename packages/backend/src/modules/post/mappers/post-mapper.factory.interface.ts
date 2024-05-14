import { Mapper, PresenterMapper } from "~/common/core/Mapper";
import { Entity } from "~/common/domain/entity.base";
import { Post } from "../domain/post.agregate-root";
import { PostImage } from "../domain/post-image.entity";
import { User } from "../domain/user.agreegate-root";



export interface IPostMapperPresenterFactory{
  createPostMapper<TDomain extends Post> (): PresenterMapper<TDomain, any>;
  createPostImageMapper<TDomain extends PostImage, TRaw extends Record<string, any>> (): PresenterMapper<TDomain, TRaw>;
  createUserMapper<TDomain extends User, TRaw extends Record<string, any>> (): PresenterMapper<TDomain, TRaw>;
}

export interface IPostMapperFactory{
  
  createPostMapper<TDomain extends Post> (): Mapper<TDomain, any>;
  createPostImageMapper<TDomain extends PostImage, TRaw extends Record<string, any>> (): Mapper<TDomain, TRaw>;
  createUserMapper<TDomain extends User, TRaw extends Record<string, any>> (): Mapper<TDomain, TRaw>;

}