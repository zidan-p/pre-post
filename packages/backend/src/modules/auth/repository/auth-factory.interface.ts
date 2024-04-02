import { IUserRepo } from "./user.repository.port";






export interface IAuthFactory{
  userRepositoryCreator(...args: any): IUserRepo;
}