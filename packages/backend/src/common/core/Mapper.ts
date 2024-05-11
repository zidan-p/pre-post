import { Entity } from "../domain/entity.base";



export interface Mapper<
  TEntity extends Entity<any> = Entity<any>, 
  TRaw extends Record<string, any> = Record<string, any> 
  >
{
  toDomain: (raw: TRaw) => TEntity;
  toPersistence: (entity: TEntity) => TRaw;
}




export interface PresenterMapper<
  TEntity extends Entity<any> = Entity<any>, 
  TRaw extends Record<string, any> = Record<string, any> 
>{
  toDomain: (raw: TRaw) => TEntity;
  toPresentation: (entity: TEntity) => TRaw;
}