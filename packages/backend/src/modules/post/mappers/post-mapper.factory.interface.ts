import { Mapper } from "~/common/core/Mapper";
import { Entity } from "~/common/domain/entity.base";


// use it or no???
export interface IPostMapperFactory{
  
  createPostMapper: <TDomain extends Entity<any>, TRaw> () => Mapper<TDomain, TRaw>;
  createImagePostMapper: <TDomain extends Entity<any>, TRaw> () => Mapper<TDomain, TRaw>
}