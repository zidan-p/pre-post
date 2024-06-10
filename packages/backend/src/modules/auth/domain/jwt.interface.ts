import { RoleValue } from "~/common/core/role.const";

export interface JWTClaims {
  id: string;
  isEmailVerified: boolean;
  email: string;
  username: string;
  role: RoleValue
}; 

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;