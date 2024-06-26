import { RoleValue } from "~/common/core/role.const";
import { User } from "~/modules/user/domain/user.agreegate-root";

export interface CreateUserFiles{}

export interface CreateUserBody{
  username?: string;
  email?: string;
  password?: string;
  role?: RoleValue
}

export interface CreateUserParams{}

export interface CreateUserQuery{}

export interface CreateUserDTORequest{
  body: CreateUserBody;
}

export interface CreateUserDTOResponse{
  user: User;
}

export type CreateUserDTOEnd = {} | null