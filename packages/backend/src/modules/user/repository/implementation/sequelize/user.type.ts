import { RoleValue } from "~/common/core/role.const";




export interface UserSequelize {
  id: string
  password: string;
  email: string;
  username: string;
  role: RoleValue;
}