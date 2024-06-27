import { User } from "~/modules/user/domain/user.agreegate-root";

export interface GetUserFiles{}

export interface GetUserBody{}

export interface GetUserParams{
  userId?: string
}

export interface GetUserQuery{}

export interface GetUserDTORequest {
  params?: GetUserParams;
}

export interface GetUserDTOResponse{
  user: User;
}

export type GetUserDTOEnd<TUser = any> = {
  user: TUser;
}