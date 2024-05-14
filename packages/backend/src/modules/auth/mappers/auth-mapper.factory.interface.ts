import { Mapper, PresenterMapper } from "~/common/core/Mapper";
import { User } from "../domain/user.agregate-root";




export interface IAuthMapperPresenterFactory{
  createUserMapper<TDomain extends User> (): PresenterMapper<TDomain, any>
}



export interface IAuthMapperPersitenceFactory{
  createUserMapper<TDomain extends User> (): Mapper<TDomain, any>
}