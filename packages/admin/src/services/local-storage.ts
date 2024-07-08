import { jwtDecode } from "jwt-decode";
import { DecodedJWT } from "../shared/types/jwt";




export function setLocalStorageRefreshToken(token : string){
  localStorage.setItem("token", token);
}

export function clearLocalStorageRefreshToken(){
  localStorage.removeItem("token");
}


export function getLocalStorageRefreshToken(){
  return localStorage.getItem("token");
}


export function getDecodedUserFromRefreshToken(){
  const token = getLocalStorageRefreshToken();
  if(!token) return null;

  const result = jwtDecode(token) as DecodedJWT;
  return result.context;
}