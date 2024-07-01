import { IGeneralPresenterMapper, IPresenterMapper } from "~/common/core/mapper";
import { UserMap } from "./user.mapper";
import { IUserMapperPresenterFactory } from "../user-mapper.factory.interface.ts";
import { ExpressPaginateWithUrlMap } from "./paginate-with-url.map";





export class ExpressUserMapperFactory implements IUserMapperPresenterFactory{

  constructor(private readonly url: URL){}

  getUserMapper(): IPresenterMapper<any, any> {
    return new UserMap();
  }
  getPaginateMapper(): IGeneralPresenterMapper<any, any> {
    return new ExpressPaginateWithUrlMap(this.url);
  }
  
}