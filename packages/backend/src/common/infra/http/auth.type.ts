import { IUserAuth } from "~/common/core/user.auth.interface";



export interface DecodedJWT {
  sub: string,
  context: IUserAuth,
  iat: number,
  exp: number
}