import { IUserAuth } from "~/common/core/user.auth.interface";
import { Post } from "~/modules/post/domain/post.agregate-root";

export interface GetOnePostFiles{}

export interface GetOnePostBody{}

export interface GetOnePostParams{
  postId: string;
}

export interface GetOnePostQuery{}

export interface GetOnePostDTORequest {
  params?: Partial<GetOnePostParams>;
  user?: IUserAuth;
}

export interface GetOnePostDTOResponse{
  post: Post
}

export interface GetOnePostDTOEnd<TPost = any>{
  post: TPost;
}