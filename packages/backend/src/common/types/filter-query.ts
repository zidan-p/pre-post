import { IPaginate } from "./paginate";

export type WhereConfig<T extends Object> = {[K in keyof T] ?: T[K]};

export type WhereInConfig<T extends Object> = {[K in keyof T] ?: T[K][]};

export type OrderConfig = "ASC" | "DESC";

export type OrderByCofig<T extends Object> = [keyof T, OrderConfig][];


export interface FilterConfig<TProps extends Object>{
  paginate?: Partial<IPaginate>;
  order?: OrderConfig;
  orderBy?: OrderByCofig<TProps>;
};

/**
 * @see FilterQueryFlat
 * @description
 * useful used in query string 
 * */
export interface FilterQuery<TProps extends Object> extends IPaginate{
  where: WhereConfig<TProps>
  whereIncluded: WhereInConfig<TProps>;
  whereExcluded: WhereInConfig<TProps>;
  orderBy: OrderByCofig<TProps>;
}

/** 
 * useful when you want flat data
 * */
export type FilterQueryFlat<TProps extends Object> = 
  & WhereConfig<TProps>
  & WhereInConfig<TProps>
  & WhereInConfig<TProps>
  & OrderByCofig<TProps>
  & IPaginate;