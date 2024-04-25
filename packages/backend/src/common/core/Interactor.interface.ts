import { ExceptionBase } from "../exceptions";





export interface IInteractor {

  getRequestData(field?:string): any;
  getHeaderData(field?:string): any;
  getFilesData(field?:string) : any;
  getFileData(): any;

  ok<T> (args: T, message?:string): any;
  created (message: string, metadata: Record<string, any>):any ;
  clientError (message: string, metadata: Record<string, any>): any; 
  unauthorized (message: string, metadata: Record<string, any>): any; 
  paymentRequired (message: string, metadata: Record<string, any>): any; 
  forbidden (message: string, metadata: Record<string, any>): any; 
  notFound (message: string, metadata: Record<string, any>): any; 
  conflict (message: string, metadata: Record<string, any>): any; 
  tooMany (message: string, metadata: Record<string, any>): any; 

  fail (message: string, error: ExceptionBase, metadata: Record<string, any>) 
}