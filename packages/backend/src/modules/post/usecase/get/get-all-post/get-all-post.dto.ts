import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { Post } from "../../../domain/post.agregate-root";


export interface GetAllPostBody{}

export interface GetAllPostParam {}

export interface GetAllPostQuery{
  paginate: IPaginate;
}


export interface GetAllPostDTORequest {
  query: GetAllPostQuery
}


export interface GetAllPostDTOResponse{
  posts: Post[];
  paginate: IPaginateReponse
}