import { Request, Response } from "express";
import { IInteractor } from "~/common/core/Interactor.interface";
import { ExceptionBase } from "~/common/exceptions";
import { PrePostResponse } from "../response/reponse.type";






export class ExpressInteractor implements IInteractor {

  constructor(
    private readonly request: Request,
    private readonly response: Response,
  ){}

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

  getHeaderData(field?:string){
    if(field) return this.request.header[field];
    return this.request.header;
  }

  // get only single file
  getFileDate(){
    return this.request.file;
  }

  // get multiple files
  getFilesData(field?:string){
    if(field){
      return this.request.files[field];
    }

    return this.request.files;
  }

  ok<T>(args: T, message: string){
    this.jsonResponse(true, 200, message, args);
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
    this.jsonResponse(false, 500, message, null, error ?? error?.toJSON());
  }
  
}