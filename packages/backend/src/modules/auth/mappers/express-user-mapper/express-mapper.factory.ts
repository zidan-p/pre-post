import { IPresenterMapper } from "~/common/core/mapper";
import { IAuthMapperPresenterFactory } from "../auth-mapper.factory.interface";
import { UserMap } from "./user.mapper";





export class ExpressAuthMapperFactory implements IAuthMapperPresenterFactory{

  createUserMapper(): IPresenterMapper<any, any> {
    return new UserMap();
  }
  
}