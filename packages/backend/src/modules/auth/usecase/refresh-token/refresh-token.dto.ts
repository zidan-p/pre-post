import { JWTToken } from "../../domain/jwt.interface";




export interface RefreshTokenDTO{
  refreshToken: JWTToken
} 

export interface RefreshTokenResponseDTO{
  accessToken: JWTToken;
}