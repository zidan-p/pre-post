

export interface IPaginate {
  page: number;
  dataPerPage: number;
}


export type WhereConfig<T extends object> = {[K in keyof T] ?: T[K]};
export type WhereInConfig<T extends object> = {[K in keyof T] ?: T[K][]};
export type OrderConfig = "ASC" | "DESC";
export type OrderByCofig<T extends object> = [keyof T, OrderConfig][];

export interface FilterType<TProps extends object = object> {
  where: WhereConfig<TProps>
  whereIncluded: WhereInConfig<TProps>;
  whereExcluded: WhereInConfig<TProps>;
}

// the query in url query strin structre
// should be converted in array notation
export interface RemoteQueryFilter <TProps extends object = object> extends IPaginate{
  where: WhereConfig<TProps>
  whereIncluded: WhereInConfig<TProps>;
  whereExcluded: WhereInConfig<TProps>;
  orderBy: OrderByCofig<TProps>;
}