





export interface PrePostResponse<T, E = null>{
  status: boolean,
  path: string,
  message: string,
  statusCode: string,
  data: T,
  error?: E
}