import { IPaginate } from "./paginate";

export type WhereConfig<T extends Object> = {[K in keyof T] ?: T[K]};
export type OrderConfig = "ASC" | "DESC";
export type OrderByCofig<T extends Object> = [keyof T, OrderConfig?][];



export interface FilterConfig<TProps extends Object>{
  paginate?: IPaginate;
  order?: OrderConfig;
  orderBy?: OrderByCofig<TProps>;
} 