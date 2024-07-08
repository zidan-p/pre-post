import { IUserAuth } from "~/common/core/user.auth.interface";

export interface DeleteManyPostsFiles{}

export interface DeleteManyPostsBody{}

export interface DeleteManyPostsParams{}

export interface DeleteManyPostsQuery{
  postIds: string[];
  // apprently mysql set limit for how much you can delete or get.
  // tobe safe, just provide the limit.
  limit?: string; 

}

export interface DeleteManyPostsDTORequest{
  query?: DeleteManyPostsQuery;
}

export interface DeleteManyPostsDTOResponse{
  postIds: string[];
}