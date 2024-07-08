import { IUserAuth } from "~/common/core/user.auth.interface";
import { Post } from "~/modules/post/domain/post.agregate-root";

export interface DeletePostFiles{}

export interface DeletePostBody{}

export interface DeletePostParam{
  postId: string;
}

export interface DeletePostDTORequest {
  param: DeletePostParam;
}

export interface DeletePostDTOResponse{
  post: Post
}