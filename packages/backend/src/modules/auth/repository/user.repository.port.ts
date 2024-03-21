import { UserEmail } from "~/modules/auth/domain/user-email.value-object";
import { UserName } from "~/modules/auth/domain/user-name.value-object";
import { User } from "~/modules/auth/domain/user.agregate-root";

export interface IUserRepo {
  exists (userEmail: UserEmail): Promise<boolean>;
  getUserByUserId (userId: string): Promise<User>;
  getUserByUserEmail (email: UserEmail | string): Promise<User>;
  getUserByUserName (userName: UserName | string): Promise<User>;
  save (user: User): Promise<void>;
}