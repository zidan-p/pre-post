import { Entity } from "../domain/entity.base";



export interface Mapper<
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
  TRaw1 extends Record<string, any> = Record<string, any>,
  /** 
   * the secondary input or output, when there are more output that can be used 
   * */
  TRaw2 extends Record<string, any> = TRaw1,
>{
  toDomain: (raw: TRaw1 | TRaw2) => TEntity;
  toPresentation: (entity: TEntity) => TRaw1 | TRaw2;
}