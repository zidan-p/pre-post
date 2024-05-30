import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { Post } from "~/modules/post/domain/post.agregate-root";

export interface GetAllPublishedPostsFiles{}

export interface GetAllPublishedPostsBody{}

export interface GetAllPublishedPostsParams{}

export interface GetAllPublishedPostsQuery {
  paginate: IPaginate
}

export interface GetAllPublishedPostsDTORequest {
  query: GetAllPublishedPostsQuery;
}

export interface GetAllPublishedPostsDTOResponse{
  posts: Post[],
  paginate: IPaginateReponse
}

export interface GetAllPublishedPostsDTOEnd<TPostPresenter>{
  posts: TPostPresenter[],
  paginate: IPaginateReponse
}