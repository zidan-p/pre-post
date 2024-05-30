import { Post } from "~/modules/post/domain/post.agregate-root";

export interface GetManyPostsFiles{}

export interface GetManyPostsBody{
  postIds: string[];
}

export interface GetManyPostsParams{}

export interface GetManyPostsQuery{}

export interface GetManyPostsDTORequest {
  body: GetManyPostsBody;
}

export interface GetManyPostsDTOResponse{
  posts: Post[]
}

export interface GetManyPostsDTOEnd<TPostPresenter = any>{
  posts: TPostPresenter[];
}