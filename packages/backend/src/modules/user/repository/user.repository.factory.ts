import { IUserRepo } from "./user.respository.port";




export interface IUserRepoFactory{
  getUserRepo: () => IUserRepo
}