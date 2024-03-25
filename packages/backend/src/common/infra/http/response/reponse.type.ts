





export interface PrePostResponse<T>{
  status: boolean,
  path: string,
  message: string,
  statusCode: string,
  data: T
}