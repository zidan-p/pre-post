import { IUserAuth } from "~/common/core/user.auth.interface";

export interface DeleteOwnedPostFiles{}

export interface DeleteOwnedPostBody{}

export interface DeleteOwnedPostParams{
  postId: string;
}

export interface DeleteOwnedPostQuery{}

export interface DeleteOwnedPostDTORequest {
  param: DeleteOwnedPostParams;
  user: IUserAuth;
}

export interface DeleteOwnedPostDTOResponse{}

export interface DeleteOwnedPostDTOEnd{}