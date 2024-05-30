import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { GetNewestPostQuery } from "../get-newest-post/get-newest-post.dto";
import { Post } from "~/modules/post/domain/post.agregate-root";

export interface GetNewestPublishedPostFiles{}

export interface GetNewestPublishedPostBody{}

export interface GetNewestPublishedPostParams{}

export interface GetNewestPublishedPostQuery {
  paginate: IPaginate
}

export interface GetNewestPublishedPostDTORequest {
  query: GetNewestPostQuery;
}

export interface GetNewestPublishedPostDTOResponse{
  posts: Post[];
  paginate: IPaginateReponse
}

export interface GetNewestPublishedPostDTOEnd<TPostPresenter>{
  posts: TPostPresenter[];
  paginate: IPaginateReponse
}