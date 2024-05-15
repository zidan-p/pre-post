import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { Post } from "../../domain/post.agregate-root";


export interface GetAllPostBody{}

export interface GetAllPostParam extends IPaginate{}


export interface GetAllPostDTORequest {}


export interface GetAllPostDTOResponse{
  posts: Post;
  paginate: IPaginateReponse
}