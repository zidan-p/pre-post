import { IGeneralPresenterMapper, IPresenterMapper, PersisterMapper } from "~/common/core/mapper";
import { User } from "../domain/user.agreegate-root";
import { IPaginateReponse } from "~/common/types/paginate";








export interface IUserMapperPresenterFactory {
  getUserMapper<TDomain extends User, TRaw extends Record<string, any> = Record<string, any>>(): IPresenterMapper<TDomain, TRaw>;
  getPaginateMapper<TPresenter = any>(): IGeneralPresenterMapper<IPaginateReponse, TPresenter>;
}

export interface IUserMapperPersiterFactory {
  getUserMapper<TDomain extends User, TRaw extends Record<string, any> = Record<string, any>>(): PersisterMapper<TDomain, TRaw>;
}