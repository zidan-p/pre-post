import { AuthProvider, UserIdentity } from "react-admin";
import { clearRequestAccessToken, requestor, setRequestAccessToken } from "./requestor";
import { clearLocalStorageRefreshToken, getDecodedUserFromRefreshToken, getLocalStorageRefreshToken, setLocalStorageRefreshToken } from "./local-storage";
import { isAxiosError } from "axios";
import { Role, RoleValue } from "../models/role.type";


interface RefreshTokenResult{
  data: { accessToken: string}
}

interface LoginResult{
  data: {  
    accessToken: string;
    refreshToken: string;
  }
}



export class prepostAuthProvider implements AuthProvider{
  
  private readonly URL: string
  constructor(url: string){ this.URL = url}

  async login({username, password}: {username: string, password: string}){


    try {
      const result = await requestor.post<LoginResult>(this.URL + "/auth/login", {email: username, password});
      
      const data =  result.data;
  
      // save to local storage
      setLocalStorageRefreshToken(data?.data?.refreshToken);
  
      // set to axios requester
      setRequestAccessToken(data?.data?.accessToken);
    } catch (error) {
      if(isAxiosError(error)){
        throw {message: error?.response?.data?.message ?? "Invalid Credentials"}
      }

      console.error(error);
      throw {message : "Issue when login"}
    }

     
  };
  logout(){
    clearRequestAccessToken();
    clearLocalStorageRefreshToken();
    return Promise.resolve();
  }

  async checkAuth(){

    try {
      // get refresh token
      const refreshToken = getLocalStorageRefreshToken();
  
      // throw credential not found
      if(!refreshToken) throw new Error("Credential Not found");

      // check if refresh token valid
      const result = await requestor.post<RefreshTokenResult>(this.URL + "/auth/refresh-token", {refreshToken});

      // throw axios error when error
      if(result.status !== 200) throw result;

      setRequestAccessToken(result.data.data.accessToken);

    } catch (error) {
      throw { redirectTo: "/login", message: (error as any)?.message ?? "isu kredensial" }
    }
  }
  async checkError(error: any) {

    // check if it's issue that related to credentials
    if (error?.status === 401 || error?.status === 403) {
      // get refresh token
      const refreshToken = getLocalStorageRefreshToken();

      // throw credential not found
      if(!refreshToken) throw new Error("Credential Not found");

      // check if refresh token valid
      const result = await requestor.post<RefreshTokenResult>(this.URL + "/auth/refresh-token", {refreshToken});

      // throw axios error when error
      if(result.status !== 200) throw result;

      setRequestAccessToken(result.data.data.accessToken);
    }

    return;

  };
  
  async getIdentity?(): Promise<UserIdentity>{
    const user = getDecodedUserFromRefreshToken()
    if(!user) throw new Error("User not found");

    return user;
  }

  async getPermissions(): Promise<RoleValue>{
    const user = getDecodedUserFromRefreshToken()
    if(!user) return Role.ANONYMOUS;

    return user.role;
  }
  
}