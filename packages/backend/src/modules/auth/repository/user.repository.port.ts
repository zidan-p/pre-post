import { UserEmail } from "~/modules/auth/domain/user-email.value-object";
import { UserName } from "~/modules/auth/domain/user-name.value-object";
import { User } from "~/modules/auth/domain/user.agregate-root";

type Updated = 0;
type Created = 1;
export type saveStatus = Created | Updated; 

export interface IUserRepo {
  exists (userEmail: string): Promise<boolean>;
  existsByEmail (userEmail: UserEmail): Promise<boolean>;
  getUserByUserId (userId: string): Promise<User | null>;
  getUserByUserEmail (email: UserEmail | string): Promise<User | null>;
  getUserByUserName (userName: UserName | string): Promise<User | null>;
  save (user: User): Promise<saveStatus>;
}