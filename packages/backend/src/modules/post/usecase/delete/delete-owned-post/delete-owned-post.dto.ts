import { IUserAuth } from "~/common/core/user.auth.interface";
import { Post } from "~/modules/post/domain/post.agregate-root";

export interface DeleteOwnedPostFiles{}

export interface DeleteOwnedPostBody{}

export interface DeleteOwnedPostParams{
  postId: string;
}

export interface DeleteOwnedPostQuery{}

export interface DeleteOwnedPostDTORequest {
  param: DeleteOwnedPostParams;
  user: IUserAuth;
}

export interface DeleteOwnedPostDTOResponse{
  post: Post
}

export interface DeleteOwnedPostDTOEnd{}