import { IPaginateReponse } from "~/common/types/paginate";
import { Post } from "../../domain/post.agregate-root";

export interface GetPostsByCurrentUserFiles{}

export interface GetPostsByCurrentUserBody{}

export interface GetPostsByCurrentUserParams{}

export interface GetPostsByCurrentUserUser{}

export interface GetPostsByCurrentUserDTORequest {}

export interface GetPostsByCurrentUserDTOResponse{
  post: Post[];
  paginate: IPaginateReponse
}