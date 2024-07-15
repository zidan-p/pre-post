import { Post } from "@entities/post/model";
import { requestor } from "./requestor";
import { PrePostGetListResponse, PrePostGetOneResponse } from "./response";
import { IPaginate, RemoteQueryFilter } from "./query";
import { convertToArrayNotation } from "@shared/utils/object";
import queryString from "query-string";





export async function getOnePost(id: string){
  const result = await requestor.get<PrePostGetOneResponse<Post>>(`/posts/${id}`);
  
  const newData: Post = {
    ...result.data.data,
    dateTimeCreated: new Date(result.data.data.dateTimeCreated),
    dateTimePosted: result.data.data.dateTimePosted ? new Date(result.data.data.dateTimePosted) : undefined
  }
  return {data: newData};
}

export async function getListPost(filter?: RemoteQueryFilter<Post>){
  const query = filter ? convertToArrayNotation(filter) : undefined
  const url = queryString.stringifyUrl({url: "/posts", query});
  const result = await requestor.get<PrePostGetListResponse<Post>>(url);

  const newData: Post[] = result.data.data.map(post => {
    return {
      ...post,
      dateTimeCreated: new Date(post.dateTimeCreated),
      dateTimePosted: post.dateTimePosted ? new Date(post.dateTimePosted) : undefined
    }
  })

  const newResponse: PrePostGetListResponse<Post> = {
    data: newData,
    pagination: result.data.pagination
  }

  return newResponse
}


export async function getListPostByUser(userId: string, paginate?:Partial <IPaginate>){
  const query = paginate ? convertToArrayNotation(paginate) : {};
  const url = queryString.stringifyUrl({url: "/users/" + userId + "/posts", query});
  const result = await requestor.get<PrePostGetListResponse<Post>>(url);

  const newData: Post[] = result.data.data.map(post => {
    return {
      ...post,
      dateTimeCreated: new Date(post.dateTimeCreated),
      dateTimePosted: post.dateTimePosted ? new Date(post.dateTimePosted) : undefined
    }
  })

  const newResponse: PrePostGetListResponse<Post> = {
    data: newData,
    pagination: result.data.pagination
  }

  return newResponse
}