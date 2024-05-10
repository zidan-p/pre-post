import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { PostImageProps } from "../../domain/post-image.entity";

export interface UpdatePostFiles{
  postImage: PostImageProps;
}

export interface UpdatePostBody{
  ownerId: string | number;
  title: string;
  content: string;
  isPublished: boolean;
  dateTimeCreate: Date;
}

export interface UpdatePostDTORequest {
  body: UpdatePostBody;
  files?: UpdatePostFiles
}


export interface UpdatePostDTOResponse{
  postId: string;
}