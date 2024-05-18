import { IUserAuth } from "../core/user.auth.interface";

export {}

declare global {
  namespace Express {
    interface User extends IUserAuth {}
  }
}