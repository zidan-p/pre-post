import { IUserRepoFactory } from "../../user.repository.factory";
import { IUserRepo } from "../../user.respository.port";
import { SequelizeUserRepository } from "./user.repository";





export class SequelizeUserCachedFactory implements IUserRepoFactory {

  constructor(
    private readonly userRepo: SequelizeUserRepository
  ){}

  getUserRepo(){
    return this.userRepo;
  }
}