import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { EditableField } from "~/modules/post/domain/editable-field.interface";

export interface UpdateManyPostFiles{
  postImage?: ICommonFile;
}

export interface UpdateManyPostBody extends Partial<EditableField>{
}

export interface UpdateManyPostParams{}

export interface UpdateManyPostQuery{
  postIds?: string[];
}

export interface UpdateManyPostDTORequest {
  body: UpdateManyPostBody;
  query: UpdateManyPostQuery;
  files: UpdateManyPostFiles;
}

export interface UpdateManyPostDTOResponse{
  postIds: string[];
}

export interface UpdateManyPostDTOEnd{
  postIds: string[];
}