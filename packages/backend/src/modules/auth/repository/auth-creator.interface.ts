import { IUserRepo } from "./user.repository.port";






export interface IAuthCreator{
  userRepositoryCreator(...args: any): IUserRepo;
}