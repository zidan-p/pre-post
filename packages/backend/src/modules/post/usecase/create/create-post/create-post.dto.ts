import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { PostImageProps } from "../../../domain/post-image.entity";
import { Post } from "~/modules/post/domain/post.agregate-root";

export interface CreatePostFiles{
  postImage?: ICommonFile;
}

export interface CreatePostBody{
  ownerId: string | number;
  title: string;
  content: string;
  isPublished?:boolean;
  dateTimeCreate?: Date;
}

export interface CreatePostDTORequest {
  body: CreatePostBody;
  files: CreatePostFiles
}


export interface CreatePostDTOResponse{
  post: Post;
}