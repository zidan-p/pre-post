import { Role } from "./role.const";






export interface IUserAuth{
  id: string;
  email: string;
  username: string;
  role: typeof Role[keyof typeof Role]
}