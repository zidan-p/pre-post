import { authConfig } from "~/config/index";
import { JWTClaims } from "../../../domain/jwt.interface";
import { IJWTService } from "../../jwt.service.interface";
import { sign, verify } from 'jsonwebtoken'
import { ServiceError } from "~/common/core/service-error.base";
import { JWTServiceErrors } from "../../exception/jwt-service.exception";


interface DecodedJWT {
  sub: string,
  context: JWTClaims,
  iat: number,
  exp: number
}


export class JWTServiceImpl implements IJWTService{
  
  signJWT(props: JWTClaims): string {
    const token = sign({sub: props.id, context: props}, authConfig.secret, {expiresIn: authConfig.tokenExpiryTime});
    return token
  }

  signRefreshJWT(props: JWTClaims): string {
    return sign({sub: props.id, context: props}, authConfig.refreshSecret, {expiresIn: authConfig.refreshTokenExpireTime});
    
  }
  
  decodeJWT(token: string): Promise<JWTClaims> {
    return new Promise((resolve, reject) => {
      verify(token, authConfig.secret, (err, decoded: DecodedJWT) => {
        if (err){
          console.error(err);

          if(err?.name === "TokenExpiredError")
            return reject(new JWTServiceErrors.ExpiredJWT("Expired Token when Decode", err));
          // return resolve(null)
          return reject(new JWTServiceErrors.JSONIssue("Failed Decode JWT", err));
        }
        return resolve(decoded.context);
      });
    })
  }

  decodeRefreshJWT(token: string): Promise<JWTClaims> {
    return new Promise((resolve, reject) => {
      verify(token, authConfig.refreshSecret, (err, decoded: DecodedJWT) => {
        if (err){ 
          console.error(err);

          if(err?.name === "TokenExpiredError")
            return reject(new JWTServiceErrors.ExpiredJWT("Expired Token when Decode", err));
          // return resolve(null)
          return reject(new JWTServiceErrors.JSONIssue("Failed Decode JWT", err));
        }
        return resolve(decoded.context);
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