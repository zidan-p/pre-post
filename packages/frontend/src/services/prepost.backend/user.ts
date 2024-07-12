import { User } from "@entities/user";
import { requestor } from "./requestor";
import { PrePostGetListResponse, PrePostGetOneResponse } from "./response";




export async function getListUser(){
  const result = await requestor.get<PrePostGetListResponse<User>>("/users");
  return result.data;
}


export async function getOneUser(id: string){
  const result = await requestor.get<PrePostGetOneResponse<User>>(`/users/${id}`);
  return result.data;
}

