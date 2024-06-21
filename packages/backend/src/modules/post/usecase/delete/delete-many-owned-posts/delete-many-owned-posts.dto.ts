import { IUserAuth } from "~/common/core/user.auth.interface";

export interface DeleteManyOwnedPostsFiles{}

export interface DeleteManyOwnedPostsBody{

}

export interface DeleteManyOwnedPostsParams{}

export interface DeleteManyOwnedPostsQuery{
  postIds?: string[]
}

export interface DeleteManyOwnedPostsDTORequest {
  user: IUserAuth;
  query?: DeleteManyOwnedPostsQuery;
}

export interface DeleteManyOwnedPostsDTOResponse{
  affectedRecord: number;
}