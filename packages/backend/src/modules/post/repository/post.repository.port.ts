import { IPaginate, IPaginateReponse, ResultWithPagination } from "~/common/types/paginate";
import { PostId } from "../domain/post-id.value-object";
import { Post, PostProps, PostPropsWithId } from "../domain/post.agregate-root";
import { FilterConfig, WhereConfig, WhereInConfig } from "~/common/types/filter-query";
import { SaveStatus } from "~/common/types/repository";



export interface IPostRepo{

  exists(postId: string): Promise<boolean>;

  isInSearch(payload: WhereInConfig<PostPropsWithId>, config?: FilterConfig<PostPropsWithId>): Promise<Post[]>;
  countIsInSearch(payload: WhereInConfig<PostPropsWithId>, config?: FilterConfig<PostPropsWithId>): Promise<number>;
  paginateIsInSearch(payload: WhereInConfig<PostPropsWithId>, paginate?: Required<IPaginate>): Promise<IPaginateReponse>;

  isInSearchWhere(
    payloadInQuery: WhereInConfig<PostPropsWithId>, 
    payloadWhereQuery: WhereConfig<PostPropsWithId>, 
    config?: FilterConfig<PostPropsWithId>
  ): Promise<Post[]>;

  countIsInSearchWhere(
    payloadInQuery: WhereInConfig<PostPropsWithId>, 
    payloadWhereQuery: WhereConfig<PostPropsWithId>, 
    config?: FilterConfig<PostPropsWithId>
  ): Promise<number>;

  paginateIsInSearchWhere(
    payloadInQuery: WhereInConfig<PostPropsWithId>, 
    payloadWhereQuery: WhereConfig<PostPropsWithId>, 
    paginate?: Required<IPaginate>
  ): Promise<number>;

  
  findById(postId: string | PostId): Promise<Post | null>;

  // note, always place the priority first line
  find(payload: WhereConfig<PostPropsWithId>,config?: FilterConfig<PostPropsWithId>): Promise<Post[]>;
  // find(payload: {}, config?: FilterConfig<PostPropsWithId>): Promise<Post[]>;

  getPaginate(payload: WhereConfig<PostPropsWithId>, paginate?: Required<IPaginate>): Promise<IPaginateReponse>;

  /**
   * note, this method may not apply the data existence checking. so always try to check it first before delete it
   * @param postId target record id
   */
  delete(postId: string | PostId): Promise<void>;

  /**
   * delete many post
   * @param postIds 
   */
  deleteMany(postIds: string[] | PostId[]): Promise<number>;

  save (user: Post): Promise<SaveStatus>;
}