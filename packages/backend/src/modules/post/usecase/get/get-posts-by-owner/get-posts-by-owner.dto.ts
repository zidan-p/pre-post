import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { Post } from "../../../domain/post.agregate-root";

export interface GetPostsByOwnerFiles{}

export interface GetPostsByOwnerBody{}

export interface GetPostsByOwnerParams{
  userId: string;
}

export interface GetPostsByOwnerQuery extends Partial<IPaginate>{
}

export interface GetPostsByOwnerDTORequest {
  query?: GetPostsByOwnerQuery,
  param: GetPostsByOwnerParams
}

export interface GetPostsByOwnerDTOResponse{
  posts: Post[],
  paginate: IPaginateReponse
}