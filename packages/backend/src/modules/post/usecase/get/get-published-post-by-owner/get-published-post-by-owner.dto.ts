import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { Post } from "~/modules/post/domain/post.agregate-root";

export interface GetPublishedPostByOwnerFiles{}

export interface GetPublishedPostByOwnerBody{}

export interface GetPublishedPostByOwnerParams{
  ownerId: string;
}

export interface GetPublishedPostByOwnerQuery {
  paginate: IPaginate;
}

export interface GetPublishedPostByOwnerDTORequest {
  query: GetPublishedPostByOwnerQuery,
  param: GetPublishedPostByOwnerParams
}

export interface GetPublishedPostByOwnerDTOResponse{
  posts: Post[],
  paginate: IPaginateReponse
}


export interface GetPublishedPostByOwnerDTOEnd<TPostPresenter>{
  posts: TPostPresenter[],
  paginate: IPaginateReponse
}