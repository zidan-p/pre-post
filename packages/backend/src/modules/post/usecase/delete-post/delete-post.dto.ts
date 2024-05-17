import { Post } from "../../domain/post.agregate-root";


export interface DeletePostBody{}

export interface DeletePostParam{
  postId: string;
}

export interface DeletePostQuery{}


export interface DeletePostDTORequest {
  param: DeletePostParam
}


export interface DeletePostDTOResponse{
  post: Post;
}