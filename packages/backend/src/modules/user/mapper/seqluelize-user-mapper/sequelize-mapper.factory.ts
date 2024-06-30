import { PersisterMapper } from "~/common/core/mapper";
import { IUserMapperPersiterFactory } from "../user-mapper.factory.interface.ts";
import { SequelizeUserMapper } from "./sequelize.mapper.js";





export class SequelizeUserMapperFactory implements IUserMapperPersiterFactory{

  getUserMapper(): PersisterMapper<any, any> {
    return new SequelizeUserMapper();
  }
  
}