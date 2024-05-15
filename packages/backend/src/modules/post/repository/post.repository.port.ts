import { IPaginate, ResultWithPagination } from "~/common/types/paginate";
import { PostId } from "../domain/post-id.value-object";
import { Post, PostProps } from "../domain/post.agregate-root";
import { saveStatus } from "./user.repository.port";
import { FilterConfig } from "~/common/types/filter-query";



export interface IPostRepo{
  exists(postId: string): Promise<boolean>;
  findById(postId: string | PostId): Promise<Post | null>;
  find(config: FilterConfig<PostProps>): Promise<ResultWithPagination<Post[]>>;
  save (user: Post): Promise<saveStatus>;
}