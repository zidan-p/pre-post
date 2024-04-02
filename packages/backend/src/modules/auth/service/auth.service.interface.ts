import { JWTClaims, JWTToken } from "../domain/jwt.interface";
import { User } from "../domain/user.agregate-root";




export interface IAuthService {
  signJWT (props: JWTClaims): JWTToken;
  decodeJWT (token: string): Promise<JWTClaims>;
  // getTokens (username: string): Promise<string[]>;
  // saveAuthenticatedUser (user: User): Promise<void>;
  // deAuthenticateUser(username: string): Promise<void>;
}