import { IPresenterMapper, PersisterMapper } from "~/common/core/mapper";
import { User } from "../domain/user.agregate-root";




export interface IAuthMapperPresenterFactory{
  createUserMapper<TDomain extends User> (): IPresenterMapper<TDomain, any>
}



export interface IAuthMapperPersitenceFactory{
  createUserMapper<TDomain extends User> (): PersisterMapper<TDomain, any>
}