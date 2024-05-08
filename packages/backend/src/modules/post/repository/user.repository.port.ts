import { User } from "../domain/user.agreegate-root";




type Updated = 0;
type Created = 1;
export type saveStatus = Created | Updated; 

export interface IUserRepo {
  exists (id: string): Promise<boolean>;
  existsByEmail (userEmail: string): Promise<boolean>;
  getUserByUserId (userId: string): Promise<User | null>;
  getUserByUserEmail (email: string): Promise<User | null>;
  getUserByUserName (userName: string): Promise<User | null>;
  save (user: User): Promise<saveStatus>;
}