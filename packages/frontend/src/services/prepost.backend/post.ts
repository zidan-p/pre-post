import { Post } from "@entities/post/model";
import { requestor } from "./requestor";
import { PrePostGetListResponse, PrePostGetOneResponse } from "./response";
import { IPaginate, RemoteQueryFilter } from "./query";
import { convertToArrayNotation } from "@shared/utils/object";
import queryString from "query-string";





export async function getOnePost(id: string){
  const result = await requestor.get<PrePostGetOneResponse<Post>>(`/posts/${id}`);
  return result.data;
}

export async function getListPost(filter?: RemoteQueryFilter<Post>){
  const query = filter ? convertToArrayNotation(filter) : undefined
  const url = queryString.stringifyUrl({url: "/posts", query});
  const result = await requestor.get<PrePostGetListResponse<Post>>(url);
  return result.data;
}


export async function getListPostByUser(userId: string, paginate:Partial <IPaginate>){
  const query = convertToArrayNotation(paginate);
  const url = queryString.stringifyUrl({url: "/posts/" + userId + "/posts", query});
  const result = await requestor.get<PrePostGetListResponse<Post>>(url);
  return result.data;
}