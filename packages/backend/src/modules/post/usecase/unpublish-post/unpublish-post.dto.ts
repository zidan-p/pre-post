import { IUserAuth } from "~/common/core/user.auth.interface";
import { Post } from "../../domain/post.agregate-root";

export interface UnpublishPostFiles{}

export interface UnpublishPostBody{}

export interface UnpublishPostParams{
  postId: string;
}

export interface UnpublishPostUser{}

export interface UnpublishPostDTORequest {
  params: UnpublishPostParams;
  user: IUserAuth
}

export interface UnpublishPostDTOResponse{
  post: Post;
}