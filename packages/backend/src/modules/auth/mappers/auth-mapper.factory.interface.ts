import { Mapper, PresenterMapper } from "~/common/core/Mapper";
import { User } from "../domain/user.agregate-root";




export interface AuthMapperPresenterFactory{
  createUserMapper<TDomain extends User> (): PresenterMapper<TDomain, any>
}



export interface AuthMapperPersitenceFactory{
  createUserMapper<TDomain extends User> (): Mapper<TDomain, any>
}