import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { PostImageProps } from "../../domain/post-image.entity";

export interface CreatePostFiles{
  postImage: PostImageProps;
}

export interface CreatePostDTO{
  ownerId: string | number;
  title: string;
  content: string;
  isPublished: boolean;
  dateTimeCreate: Date;
  files: CreatePostFiles;
}

export interface CreatePostDTORequest extends CreatePostDTO, CreatePostDTO{}


export interface CreatePostDTOResponse{
  postId: string;
}