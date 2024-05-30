import { Entity } from "../domain/entity.base";



export interface PersisterMapper<
  TEntity extends Entity<any> = Entity<any>, 
  TRaw extends Record<string, any> = Record<string, any> 
  >
{
  toDomain: (raw: TRaw) => TEntity;
  toPersistence: (entity: TEntity) => TRaw;
}



/**
 * Interface for presenter mapper.
 * @todo find a better way to handle multiple output or input from raw data.
 */
export interface IPresenterMapper<
  /** 
   * Main Mapper entity 
   * */
  TEntity extends Entity<any> = Entity<any>,
  /** 
   * the primary or main output or input raw 
   * */
  TRaw1 = any,
  /** 
   * the secondary input or output, when there are more output that can be used 
   * */
  TRaw2 = TRaw1,
>{
  toDomain: (raw: TRaw1 | TRaw2) => TEntity;
  toPresentation: (entity: TEntity) => TRaw1 | TRaw2;
}

export interface IGeneralPresenterMapper<TIn, TPresentation>{
  toPresentation: (args:TIn) => TPresentation;
}