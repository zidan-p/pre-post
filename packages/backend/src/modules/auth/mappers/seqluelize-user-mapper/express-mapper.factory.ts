import { Mapper } from "~/common/core/Mapper";
import { User } from "../../domain/user.agregate-root";
import { IAuthMapperPersitenceFactory } from "../auth-mapper.factory.interface";
import { SequelizeUserMap } from "./user.mapper";





export class SequelizeAuthMapperFactory implements IAuthMapperPersitenceFactory{

  createUserMapper(): Mapper<any, any> {
    return new SequelizeUserMap();
  }
  
}