import { AuthRoleValue } from "../models/role.type";


export interface IUserAuth{
  id: string;
  email: string;
  username: string;
  role: AuthRoleValue
}

export interface DecodedJWT {
  sub: string,
  context: IUserAuth,
  iat: number,
  exp: number
}