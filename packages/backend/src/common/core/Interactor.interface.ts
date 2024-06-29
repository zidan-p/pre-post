import { ICommonFile } from "../domain/common/common-file.interface";
import { ExceptionBase } from "../exceptions";
import { IPaginateReponse } from "../types/paginate";
import { IUserAuth } from "./user.auth.interface";


export interface OKBuilderResponse<T>{
  data: T;
  // pagination?: IPaginateReponse;
  pagination?: any;
  header?: {
    name: string,
    value: string
  }[];
  metadata?: Record<string, any>
};

export interface FailBuilderResponse{
  errors: any;
  metadata?: Record<string, any>
}


export interface IInteractor<R = any> {

  // ---------- REQUEST -----------
  // PARAM
  getRequestParams(name: string): string | null;
  getRequestParams(): Record<string, string> | null;
  getRequestParams(name?: string): string | Record<string, string> | null;

  // BODY
  getRequestData(field?:string): any;

  // HEADER
  getHeaderData(): Record<string, any> | null;
  getHeaderData(field:string): string | null;
  getHeaderData(field?:string): string | Record<string, any> | null;

  // QUERY
  getQueryData(): Record<string, any> | null;
  getQueryData(field:string): string | null;
  getQueryData(field?:string): string | Record<string, any> | null;

  // USER AUTH
  getUser(): IUserAuth | undefined;

  // FILES
  getFilesRecord(field?:string) : Record<string, ICommonFile[]> | ICommonFile[] | null;
  getSingleArrayFiles(): ICommonFile[] | null; 
  getSingleFile(): ICommonFile | null;

  // ------------ RESPONSE ------------
  ok<T> (args: T, message?:string): R;
  okBuild<T>(args?: OKBuilderResponse<T>): R;
  okEmpty<T>(args?: OKBuilderResponse<T>): R;

  okFile(file: ICommonFile):void;

  created (message: string, metadata?: Record<string, any>):any ;
  clientError (message: string, metadata?: Record<string, any>): any; 
  unauthorized (message: string, metadata?: Record<string, any>): any; 
  paymentRequired (message: string, metadata?: Record<string, any>): any; 
  forbidden (message: string, metadata?: Record<string, any>): any; 
  notFound (message: string, metadata?: Record<string, any>): any; 
  conflict (message: string, metadata?: Record<string, any>): any; 
  tooMany (message: string, metadata?: Record<string, any>): any; 

  fail (message: string, error: ExceptionBase, metadata?: Record<string, any>);
  failBuild(args: FailBuilderResponse): any;
}