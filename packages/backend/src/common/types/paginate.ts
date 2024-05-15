





export interface IPaginate {
  page: number;
  dataPerPage: number;
}


export interface IPaginateReponse extends IPaginate {
  dataTotal: number;
  pageTotal: number;
}




export interface ResultWithPagination<T> {
  data: T;
  page: IPaginateReponse;
}