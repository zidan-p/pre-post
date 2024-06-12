import { Request, Response } from "express";
import { FailBuilderResponse, IInteractor, OKBuilderResponse } from "~/common/core/Interactor.interface";
import { ExceptionBase } from "~/common/exceptions";
import { PrePostResponse } from "../response/reponse.type";
import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { IUserAuth } from "~/common/core/user.auth.interface";
import { isEmpty, objectMap } from "~/common/utils/object";




type ExpressFile = Express.Multer.File;

export class ExpressInteractor implements IInteractor {

  constructor(
    private readonly request: Request,
    private readonly response: Response,
  ){}


  getRequestParams(name: string): string | null;
  getRequestParams(): Record<string, string> | null;
  getRequestParams(name?: string | undefined): string | Record<string, string> | null{
    if(name){
      const value = this.request.params[name];
      if(!value) return null;
      return value;
    }

    const value = this.request.params;
    return value;
  }


  serializeFile(file: Express.Multer.File): ICommonFile{
    return {
      fileType: file.mimetype,
      name: file.filename,
      size: file.size,
      group: file.fieldname
    }
  }

  
  getSingleFile() {
    if(this.request.file){
      const file = this.serializeFile(this.request.file);
      return file;
    }
    return null;
  }

  jsonResponse(status: boolean, statusCode: number, message: string, data?: any, error?: any){
    this.response.status(statusCode).json({
      success: status,
      message,
      statusCode,
      data: data ?? undefined,
      error: error ?? undefined
    })
  }

  getRequestData(field?:string){
    if(field) return this.request.body[field];
    return this.request.body;
  }

  getHeaderData(): Record<string, any> | null;
  getHeaderData(field:string): string | null;
  getHeaderData(field?:string): string | Record<string, any> | null{
    if(field) {
      const data = this.request.header[field];
      if(!data) return null;
      return data;
    };
    
    const dataRecord = this.request.header;
    if(isEmpty(dataRecord)) return null;
    return dataRecord
  }

  getQueryData(): Record<string, any> | null;
  getQueryData(field:string): string | null;
  getQueryData(field?:string): string | Record<string, any> | null{
    if(field) {
      const data = this.request.query[field];
      if(!data) return null;
      return data;
    };
    
    const dataRecord = this.request.query;
    if(isEmpty(dataRecord)) return null;
    return dataRecord

  }

  // get only single file
  getSingleArrayFiles(){
    if(this.request?.files?.length){
      const serializedFiles = (this.request.files as ExpressFile[])
        .map(file => this.serializeFile(file));
      return serializedFiles;
    }
    return null;
  }

  // get multiple files
  getFilesRecord(field?:string): Record<string, ICommonFile[]> | ICommonFile[] | null{
    if(field){

      // check if files exists
      if(!this?.request?.files){
        console.error("no files provided");
        return null;
      }

      if(!Array.isArray(this?.request?.files[field])){
        console.error("uploaded file is not an array");
        return null;
      }
      
      const file = (this.request.files[field] as ExpressFile[])
        .map(item => this.serializeFile(item));
      return file;
    }

    if(this.request.files){
      const mappedFiles = objectMap(
        (this.request.files as Record<string, ExpressFile[]>), 
        items => items.map(item => this.serializeFile(item))  
      );
      return mappedFiles;
    }else {
      return null;
    }
  }

  getUser(): IUserAuth | undefined {
    console.log(this.request.user);
    return this.request.user;
  }

  ok<T>(args: T, message: string){
    this.jsonResponse(true, 200, message, args);
  }

  okBuild<T>(args?: OKBuilderResponse<T>) {
    if(args?.header?.length) args.header.forEach(item => this.response.set(item.name, item.value));
    this.response.status(200);
    return this.response.json({
      data: args?.data,
      pagination: args?.pagination,
      metadata: args?.metadata
    });
  }

  created(message: string, metadata: Record<string, any>) {
    this.jsonResponse(true, 201, message, metadata);
  }

  clientError(message: string, metadata: Record<string, any>) {
    this.jsonResponse(false, 400, message, null, metadata);
  }
  unauthorized(message: string, metadata: Record<string, any>) {
    this.jsonResponse(false, 401, message, null, metadata);
  }
  paymentRequired(message: string, metadata: Record<string, any>) {
    this.jsonResponse(false, 402, message, null, metadata);
  }
  forbidden(message: string, metadata: Record<string, any>) {
    this.jsonResponse(false, 403, message, null, metadata);
  }
  notFound(message: string, metadata: Record<string, any>) {
    this.jsonResponse(false, 404, message, null, metadata);
  }
  conflict(message: string, metadata: Record<string, any>) {
    this.jsonResponse(false, 409, message, null, metadata);
  }
  tooMany(message: string, metadata: Record<string, any>) {
    this.jsonResponse(false, 429, message, null, metadata);
  }

  fail(message: string, error: ExceptionBase, metadata: Record<string, any>) {
    console.error(error);
    // this.jsonResponse(false, 500, message, null, error ?? error?.toJSON ? error?.toJSON() : error);
    this.jsonResponse(false, 500, message, null, error?.toJSON ? error?.toJSON() : error);
  }

  failBuild(args: FailBuilderResponse) {
    this.response.status(500);
    return this.response.json({
      errors: args.errors,
      metadata: args.metadata
    });
  }

  
}