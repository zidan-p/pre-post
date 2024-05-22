import { IUserAuth } from "~/common/core/user.auth.interface";

export interface DeleteManyPostsFiles{}

export interface DeleteManyPostsBody{
  postIds: string[]
}

export interface DeleteManyPostsParams{}

export interface DeleteManyPostsQuery{}

export interface DeleteManyPostsDTORequest{
  body: DeleteManyPostsBody;
  user: IUserAuth
}

export interface DeleteManyPostsDTOResponse{
  affectedRecord: number;
}