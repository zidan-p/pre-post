import { JWTToken } from "../../domain/jwt.interface";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginDTOResponse {
  accessToken: JWTToken;
  refreshToken: JWTToken;
}