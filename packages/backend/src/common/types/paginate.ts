





export interface IPaginate {
  page: number;
  dataPerPage: number;
}


export interface IPaginateReponse extends IPaginate {
  dataTotal: number;
  pageTotal: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}




export interface ResultWithPagination<T> {
  data: T;
  page: IPaginateReponse;
}