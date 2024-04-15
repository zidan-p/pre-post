import { ICommonFile } from "~/common/domain/common/common-file.interface";


export interface CreatePostDTO{
  ownerId: string | number;
  title: string;
  content: string;
  isPublished: boolean;
  dateTimeCreate: Date;
}

export interface CreatePostFiles{
  postImage: ICommonFile;
}

export interface CreatePostDTOResponse{
  postId: string;
}