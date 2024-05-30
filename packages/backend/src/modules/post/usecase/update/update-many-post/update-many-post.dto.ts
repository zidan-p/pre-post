import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { EditableField } from "~/modules/post/domain/editable-field.interface";

export interface UpdateManyPostFiles{
  postImage?: ICommonFile;
}

export interface UpdateManyPostBody{
  postIds: string[];
  data?: Partial<EditableField>
}

export interface UpdateManyPostParams{}

export interface UpdateManyPostQuery{}

export interface UpdateManyPostDTORequest {
  body: UpdateManyPostBody;
  files: UpdateManyPostFiles;
}

export interface UpdateManyPostDTOResponse{
  affectedRecord: number;
}

export interface UpdateManyPostDTOEnd{
  affectedRecord: number;
}