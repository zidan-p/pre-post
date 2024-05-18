import { IUserAuth } from "~/common/core/user.auth.interface";
import { Post } from "../../domain/post.agregate-root";

export interface PublishPostFiles{}

export interface PublishPostBody{}

export interface PublishPostParams{
  postId: string;
}

export interface PublishPostDTORequest {
  params: PublishPostParams;
  user: IUserAuth
}

export interface PublishPostDTOResponse{
  post: Post;
}