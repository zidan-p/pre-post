import { Post } from "~/modules/post/domain/post.agregate-root";

export interface GetManyPostsFiles{}

export interface GetManyPostsBody{
}

export interface GetManyPostsParams{
}

export interface GetManyPostsQuery{
  postIds: string[];
}

export interface GetManyPostsDTORequest {
  query?: GetManyPostsQuery;
}

export interface GetManyPostsDTOResponse{
  posts: Post[]
}

export interface GetManyPostsDTOEnd<TPostPresenter = any>{
  posts: TPostPresenter[];
}