import { User } from "~/modules/user/domain/user.agreegate-root";

export interface GetManyUserFiles{}

export interface GetManyUserBody{}

export interface GetManyUserParams{}

export interface GetManyUserQuery{
  userIds?: string[];
}

export interface GetManyUserDTORequest {
  query?: GetManyUserQuery;
}

export interface GetManyUserDTOResponse{
  users: User[];
}

export type GetManyUserDTOEnd<TUserPresenter = any> = {
  users: TUserPresenter[]
} 