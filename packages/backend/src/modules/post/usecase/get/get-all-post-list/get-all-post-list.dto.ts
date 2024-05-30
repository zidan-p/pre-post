import { FilterQuery } from "~/common/types/filter-query";
import { IPaginate } from "~/common/types/paginate";
import { Post, PostProps } from "~/modules/post/domain/post.agregate-root";

export interface GetAllPostListFiles{}

export interface GetAllPostListBody{}

export interface GetAllPostListParams{}

export interface GetAllPostListQuery extends FilterQuery<PostProps>{

}

export interface GetAllPostListDTORequest {
  query: GetAllPostListQuery;
}

export interface GetAllPostListDTOResponse{
  posts: Post[];
  paginate: IPaginate;
}

export interface GetAllPostListDTOEnd<TPost = any, TPaginate = any>{
  posts: TPost[];
  paginate: TPaginate;
}