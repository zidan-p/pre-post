import { PersisterMapper, IPresenterMapper, IGeneralPresenterMapper } from "~/common/core/mapper";
import { Entity } from "~/common/domain/entity.base";
import { Post } from "../domain/post.agregate-root";
import { PostImage } from "../domain/post-image.entity";
import { User } from "../domain/user.agreegate-root";
import { IPaginateReponse } from "~/common/types/paginate";



export interface IPostMapperPresenterFactory{ 
  createPostMapper<TDomain extends Post> (): IPresenterMapper<TDomain, any>;
  createPostImageMapper<TDomain extends PostImage, TRaw extends Record<string, any>> (): IPresenterMapper<TDomain, TRaw>;
  createUserMapper<TDomain extends User, TRaw extends Record<string, any>> (): IPresenterMapper<TDomain, TRaw>;
  createPaginateMapper<TPresenter = any>(): IGeneralPresenterMapper<IPaginateReponse, TPresenter>;
}

export interface IPostMapperFactory{
  
  createPostMapper<TDomain extends Post> (): PersisterMapper<TDomain, any>;
  createPostImageMapper<TDomain extends PostImage, TRaw extends Record<string, any>> (): PersisterMapper<TDomain, TRaw>;
  createUserMapper<TDomain extends User, TRaw extends Record<string, any>> (): PersisterMapper<TDomain, TRaw>;

}