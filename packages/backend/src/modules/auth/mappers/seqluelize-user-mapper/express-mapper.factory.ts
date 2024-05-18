import { PersisterMapper } from "~/common/core/mapper";
import { User } from "../../domain/user.agregate-root";
import { IAuthMapperPersitenceFactory } from "../auth-mapper.factory.interface";
import { SequelizeUserMap } from "./user.mapper";





export class SequelizeAuthMapperFactory implements IAuthMapperPersitenceFactory{

  createUserMapper(): PersisterMapper<any, any> {
    return new SequelizeUserMap();
  }
  
}