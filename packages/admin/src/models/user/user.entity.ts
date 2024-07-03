import { AuthRoleValue } from "../role.type";





export interface UserEntity {
  id: string;
  password: string;
  email: string;
  username: string;
  role: AuthRoleValue;
}