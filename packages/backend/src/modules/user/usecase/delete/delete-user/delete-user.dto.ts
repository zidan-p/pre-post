import { User } from "~/modules/user/domain/user.agreegate-root";

export interface DeleteUserFiles{}

export interface DeleteUserBody{}

export interface DeleteUserParams{
  userId: string
}

export interface DeleteUserQuery{}

export interface DeleteUserDTORequest {
  params?: DeleteUserParams;
}

export type DeleteUserDTOResponse = {
  user: User;
}

export type DeleteUserDTOEnd<TUser = any> = {
  user: TUser;
}