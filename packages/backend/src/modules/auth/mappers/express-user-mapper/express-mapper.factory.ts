import { Mapper, PresenterMapper } from "~/common/core/Mapper";
import { User } from "../../domain/user.agregate-root";
import { AuthMapperPersitenceFactory, AuthMapperPresenterFactory } from "../auth-mapper.factory.interface";
import { UserMap } from "./user.mapper";





export class ExpressAuthMapperFactory implements AuthMapperPresenterFactory{

  createUserMapper(): PresenterMapper<any, any> {
    return new UserMap();
  }
  
}