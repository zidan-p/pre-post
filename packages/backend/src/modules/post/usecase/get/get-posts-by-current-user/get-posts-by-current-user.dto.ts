import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { Post } from "../../../domain/post.agregate-root";
import { IUserAuth } from "~/common/core/user.auth.interface";

export interface GetPostsByCurrentUserFiles{}

export interface GetPostsByCurrentUserBody{}

export interface GetPostsByCurrentUserParams{}

export interface GetPostsByCurrentUserQuery {
  paginate?: IPaginate;
}

export interface GetPostsByCurrentUserUser{}

export interface GetPostsByCurrentUserDTORequest {
  user: IUserAuth;
  query?: GetPostsByCurrentUserQuery;
}

export interface GetPostsByCurrentUserDTOResponse{
  posts: Post[];
  paginate: IPaginateReponse
}