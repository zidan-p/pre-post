import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { PostImageProps } from "../../domain/post-image.entity";

export interface CreatePostFiles{
  postImage: PostImageProps;
}

export interface CreatePostBody{
  ownerId: string | number;
  title: string;
  content: string;
  isPublished: boolean;
  dateTimeCreate: Date;
}

export interface CreatePostDTORequest {
  body: CreatePostBody;
  files: CreatePostFiles
}


export interface CreatePostDTOResponse{
  postId: string;
}