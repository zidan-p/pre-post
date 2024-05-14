import { JWTClaims, JWTToken } from "../domain/jwt.interface";
import { User } from "../domain/user.agregate-root";




export interface IJWTService {
  signJWT (props: JWTClaims): JWTToken;
  signRefreshJWT(props: JWTClaims) : JWTToken;
  decodeJWT (token: string): Promise<JWTClaims>;
  decodeRefreshJWT(token: string): Promise<JWTClaims>;
  isTokenValid(token: string): boolean;
  // getTokens (username: string): Promise<string[]>;
  // saveAuthenticatedUser (user: User): Promise<void>;
  // deAuthenticateUser(username: string): Promise<void>;
}