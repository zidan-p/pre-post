import { IUserAuth } from "~/common/core/user.auth.interface";

export interface DeleteManyOwnedPostsFiles{}

export interface DeleteManyOwnedPostsBody{
  postIds: string[]
}

export interface DeleteManyOwnedPostsParams{}

export interface DeleteManyOwnedPostsQuery{}

export interface DeleteManyOwnedPostsDTORequest {
  body: DeleteManyOwnedPostsBody;
  user: IUserAuth;
}

export interface DeleteManyOwnedPostsDTOResponse{
  affectedRecord: number;
}