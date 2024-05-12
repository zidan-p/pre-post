import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { PostImageProps } from "../../domain/post-image.entity";

export interface UpdatePostFiles{
  postImage?: ICommonFile;
}

export interface UpdatePostBody{
  ownerId: string | number;
  title: string;
  content: string;
  isPublished: boolean;
  dateTimeUpdate: Date;
}

export interface UpdatePostDTORequest {
  body: UpdatePostBody;
  files: UpdatePostFiles
}


export interface UpdatePostDTOResponse{
  postId: string;
}