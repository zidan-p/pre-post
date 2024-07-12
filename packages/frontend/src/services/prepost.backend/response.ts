import { Pagination } from "@entities/paginate"



export interface PrePostGetOneResponse<T> {
  data: T
}

export interface PrePostGetManyResponse<T> {
  data: T[]
}

export interface PrePostGetListResponse<T>{
  data: T[]
  pagination: Pagination
}