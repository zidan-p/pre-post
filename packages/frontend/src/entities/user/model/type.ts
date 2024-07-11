import { RoleValue } from "../../role";



export interface User {
  id: string | number;
  email: string;
  username: string;
  role: RoleValue;
}