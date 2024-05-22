import { IUserAuth } from "~/common/core/user.auth.interface";

export interface DeletePostFiles{}

export interface DeletePostBody{}

export interface DeletePostParam{
  postId: string;
}

export interface DeletePostDTORequest {
  param: DeletePostParam;
  user: IUserAuth
}

export interface DeletePostDTOResponse{}