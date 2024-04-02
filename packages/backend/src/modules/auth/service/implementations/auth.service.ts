import { authConfig } from "~/config/index";
import { JWTClaims } from "../../domain/jwt.interface";
import { IAuthService } from "../auth.service.interface";
import { sign, verify } from 'jsonwebtoken'




export class AuthServiceImpl implements IAuthService{
  
  signJWT(props: JWTClaims): string {
    const token = sign(props, authConfig.secret);
    return token
  }
  
  decodeJWT(token: string): Promise<JWTClaims> {
    return new Promise((resolve, reject) => {
      verify(token, authConfig.secret, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded);
      });
    })
  }

}