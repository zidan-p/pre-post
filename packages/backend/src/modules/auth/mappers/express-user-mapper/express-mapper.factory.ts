import { Mapper, IPresenterMapper } from "~/common/core/Mapper";
import { User } from "../../domain/user.agregate-root";
import { IAuthMapperPersitenceFactory, IAuthMapperPresenterFactory } from "../auth-mapper.factory.interface";
import { UserMap } from "./user.mapper";





export class ExpressAuthMapperFactory implements IAuthMapperPresenterFactory{

  createUserMapper(): IPresenterMapper<any, any> {
    return new UserMap();
  }
  
}