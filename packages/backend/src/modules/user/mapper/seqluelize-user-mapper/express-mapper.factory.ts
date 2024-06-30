import { PersisterMapper } from "~/common/core/mapper";
import { SequelizeUserMap } from "./user.mapper";
import { IUserMapperPersiterFactory } from "../user-mapper.factory.interface.ts";





export class SequelizeAuthMapperFactory implements IUserMapperPersiterFactory{

  getUserMapper(): PersisterMapper<any, any> {
    return new SequelizeUserMap();
  }
  
}