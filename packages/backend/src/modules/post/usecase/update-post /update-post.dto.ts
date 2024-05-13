import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { PostImageProps } from "../../domain/post-image.entity";
import { Post } from "../../domain/post.agregate-root";

export interface UpdatePostFiles{
  postImage?: ICommonFile;
}

export interface UpdatePostBody{
  // ownerId: string | number;
  title?: string;
  content?: string;
  isPublished?: boolean;
}

export interface UpdatePostParam{
  postId: string;
}

export interface UpdatePostDTORequest {
  param: UpdatePostParam;
  body: UpdatePostBody;
  files: UpdatePostFiles
}


export interface UpdatePostDTOResponse{
  post: Post;
}