import { Post } from "~/modules/post/domain/post.agregate-root";

export interface GetManyPostsFiles{}

export interface GetManyPostsBody{
}

export interface GetManyPostsParams{
  postIds: string[];
}

export interface GetManyPostsQuery{}

export interface GetManyPostsDTORequest {
  params?: GetManyPostsParams;
}

export interface GetManyPostsDTOResponse{
  posts: Post[]
}

export interface GetManyPostsDTOEnd<TPostPresenter = any>{
  posts: TPostPresenter[];
}