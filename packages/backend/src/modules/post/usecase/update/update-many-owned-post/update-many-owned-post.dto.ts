import { IUserAuth } from "~/common/core/user.auth.interface";
import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { EditableField } from "~/modules/post/domain/editable-field.interface";

export interface UpdateManyOwnedPostFiles{
  postImage?: ICommonFile;
}

export interface UpdateManyOwnedPostBody{
  data?: Partial<EditableField>
}

export interface UpdateManyOwnedPostParams{}

export interface UpdateManyOwnedPostQuery{
  postIds: string[];
}

export interface UpdateManyOwnedPostDTORequest {
  body?: UpdateManyOwnedPostBody;
  query?: UpdateManyOwnedPostQuery;
  files?: UpdateManyOwnedPostFiles;
  user: IUserAuth;
}

export interface UpdateManyOwnedPostDTOResponse{
  affectedRecord: number;
}

export interface UpdateManyOwnedPostDTOEnd{
  affectedRecord: number;
}