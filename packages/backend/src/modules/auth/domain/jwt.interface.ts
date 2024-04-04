
export interface JWTClaims {
  id: string;
  isEmailVerified: boolean;
  email: string;
  username: string;
  adminUser: boolean;
}; 

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;