import { Mapper, IPresenterMapper } from "~/common/core/Mapper";
import { User } from "../domain/user.agregate-root";




export interface IAuthMapperPresenterFactory{
  createUserMapper<TDomain extends User> (): IPresenterMapper<TDomain, any>
}



export interface IAuthMapperPersitenceFactory{
  createUserMapper<TDomain extends User> (): Mapper<TDomain, any>
}