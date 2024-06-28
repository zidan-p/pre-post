import { RoleValue } from "~/common/core/role.const";
import { User } from "~/modules/user/domain/user.agreegate-root";

export interface UpdateManyUserFiles{}

export interface UpdateManyUserBody{
  username?: string;
  email?: string;
  password?: string;
  role?: RoleValue
}

export interface UpdateManyUserParams{}

export interface UpdateManyUserQuery{
  userIds?: string[]
}

export interface UpdateManyUserDTORequest {
  query?: UpdateManyUserQuery;
  body?: UpdateManyUserBody;
}

export interface UpdateManyUserDTOResponse{
  affectedRecord: number;
}

export type UpdateManyUserDTOEnd = {
  affectedRecord: number;
}