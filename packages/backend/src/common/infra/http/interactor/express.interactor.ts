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
      status,
      message,
      statusCode,
      data: data ?? undefined,
      error: error ?? undefined
    })
  }

  getRequestData(){
    return this.request.body;
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
    this.jsonResponse(false, 500, message, null, error?.toJSON());
  }
  
}