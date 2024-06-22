import { IUserAuth } from "~/common/core/user.auth.interface";
import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { Post } from "~/modules/post/domain/post.agregate-root";

export interface UpdateOwnedPostFiles{
  postImage?: ICommonFile;
}

export interface UpdateOwnedPostBody{
  title?: string;
  content?: string;
  isPublished?: boolean;
}

export interface UpdateOwnedPostParams{
  postId: string;
}

export interface UpdateOwnedPostQuery{}

export interface UpdateOwnedPostDTORequest {
  param?: UpdateOwnedPostParams;
  body?: UpdateOwnedPostBody;
  files?: UpdateOwnedPostFiles;
  user: IUserAuth; 
}

export interface UpdateOwnedPostDTOResponse{
  post: Post
}

export interface UpdateOwnedPostDTOEnd{}