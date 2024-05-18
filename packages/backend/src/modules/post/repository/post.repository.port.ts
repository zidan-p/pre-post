import { IPaginate, IPaginateReponse, ResultWithPagination } from "~/common/types/paginate";
import { PostId } from "../domain/post-id.value-object";
import { Post, PostProps } from "../domain/post.agregate-root";
import { FilterConfig, WhereConfig } from "~/common/types/filter-query";
import { SaveStatus } from "~/common/types/repository";



export interface IPostRepo{

  exists(postId: string): Promise<boolean>;
  
  findById(postId: string | PostId): Promise<Post | null>;

  find(payload: {}, config?: FilterConfig<PostProps>): Promise<Post[]>;
  find(payload?: WhereConfig<PostProps>,config?: FilterConfig<PostProps>): Promise<Post[]>;

  getPaginate(payload: WhereConfig<PostProps>, paginate: Required<IPaginate>): Promise<IPaginateReponse>;

  /**
   * note, this method may not apply the data existence checking. so always try to check it first before delete it
   * @param postId target record id
   */
  delete(postId: string | PostId): Promise<void>;

  save (user: Post): Promise<SaveStatus>;
}