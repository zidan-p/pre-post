import { OrderByCofig, WhereConfig, WhereInConfig } from "~/common/types/filter-query";
import { UserEmail } from "../domain/user-email.value-object";
import { UserName } from "../domain/user-name.value-object";
import { User, UserPropsWithId } from "../domain/user.agreegate-root";
import { IPaginate, IPaginateReponse } from "~/common/types/paginate";
import { SaveStatus, SaveStatusValue } from "~/common/core/save.status";



export interface FindAdvanceProps {
  where?: WhereConfig<UserPropsWithId>;
  whereIncluded?: WhereInConfig<UserPropsWithId>;
  whereExcluded?: WhereInConfig<UserPropsWithId>;
  orderBy?: OrderByCofig<UserPropsWithId>;
  paginate?: Partial<IPaginate>;
  includes?: []
}

export interface IUserRepo{
  exists (userEmail: string): Promise<boolean>;
  existsByEmail (userEmail: UserEmail): Promise<boolean>;
  getUserByUserId (userId: string): Promise<User | null>;
  getUserByUserEmail (email: UserEmail | string): Promise<User | null>;
  getUserByUserName (userName: UserName | string): Promise<User | null>;

  find(args: FindAdvanceProps): Promise<User[]>;
  findPaginate(args: FindAdvanceProps): Promise<IPaginateReponse>;

  save (user: User): Promise<SaveStatusValue>;
  saveCollection(users: User[]): Promise<(SaveStatusValue)[]>
}