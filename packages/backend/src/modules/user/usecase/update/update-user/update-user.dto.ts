import { RoleValue } from "~/common/core/role.const";
import { User } from "~/modules/user/domain/user.agreegate-root";

export interface UpdateUserFiles{}

export interface UpdateUserBody{
  username?: string;
  email?: string;
  password?: string;
  role?: RoleValue
}

export interface UpdateUserParams{}

export interface UpdateUserQuery{}

export interface UpdateUserDTORequest {
  body: UpdateUserBody;
}

export interface UpdateUserDTOResponse{
  user: User
}

export type UpdateUserDTOEnd <TUser = any> = {
  user: TUser;
}