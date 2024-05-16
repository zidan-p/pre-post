import { IPaginate, IPaginateReponse, ResultWithPagination } from "~/common/types/paginate";
import { PostId } from "../domain/post-id.value-object";
import { Post, PostProps } from "../domain/post.agregate-root";
import { saveStatus } from "./user.repository.port";
import { FilterConfig, WhereConfig } from "~/common/types/filter-query";



export interface IPostRepo{
  
  exists(postId: string): Promise<boolean>;
  
  findById(postId: string | PostId): Promise<Post | null>;

  find(payload: WhereConfig<PostProps>,config: FilterConfig<PostProps>): Promise<Post[]>;

  getPaginate(payload: WhereConfig<PostProps>, paginate: Required<IPaginate>): Promise<IPaginateReponse>;

  save (user: Post): Promise<saveStatus>;
}