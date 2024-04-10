import { authConfig } from "~/config/index";
import { JWTClaims } from "../../domain/jwt.interface";
import { IAuthService } from "../auth.service.interface";
import { sign, verify } from 'jsonwebtoken'




export class AuthServiceImpl implements IAuthService{
  
  signJWT(props: JWTClaims): string {
    const token = sign(props, authConfig.secret, {expiresIn: authConfig.tokenExpiryTime});
    return token
  }

  signRefreshJWT(props: JWTClaims): string {
    return sign(props, authConfig.refreshSecret, {expiresIn: authConfig.refreshTokenExpireTime});
    
  }
  
  decodeJWT(token: string): Promise<JWTClaims> {
    return new Promise((resolve, reject) => {
      verify(token, authConfig.secret, (err, decoded) => {
        if (err){ 
          console.error(err);
          return resolve(null)
        }
        return resolve(decoded);
      });
    })
  }

  decodeRefreshJWT(token: string): Promise<JWTClaims> {
    return new Promise((resolve, reject) => {
      verify(token, authConfig.refreshSecret, (err, decoded) => {
        if (err){ 
          console.error(err);
          return resolve(null)
        };
        return resolve(decoded);
      });
    })
  }

  isTokenValid(token: string): boolean {
    try {
      // Split the token into its parts
      const parts = token.split('.');
      
      // Check if there are three parts
      if (parts.length !== 3) {
          return false;
      }
      
      // Decode the header
      const header = JSON.parse(Buffer.from(parts[0], 'base64').toString('utf8'));
      
      // Decode the payload
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
      
      // Check if the header and payload are objects
      if (typeof header !== 'object' || typeof payload !== 'object') {
          return false;
      }
      
      // Check if the token has a signature
      if (!parts[2]) {
          return false;
      }
      
      // If all checks pass, return true
      return true;
    } catch (err) {
        // If any error occurs, return false
        return false;
    }
  }

}