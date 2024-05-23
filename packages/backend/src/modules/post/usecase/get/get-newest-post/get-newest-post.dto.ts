import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { Post } from "../../../domain/post.agregate-root";

export interface GetNewestPostFiles{}

export interface GetNewestPostBody{}

export interface GetNewestPostParams{}

export interface GetNewestPostQuery extends IPaginate{}

export interface GetNewestPostDTORequest {
  query: GetNewestPostQuery;
}

export interface GetNewestPostDTOResponse<TPostPresenter = any>{
  posts: TPostPresenter[];
  paginate: IPaginateReponse
}