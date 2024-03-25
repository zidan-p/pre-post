import { Request, Response } from "express";
import { IInteractor } from "~/common/core/Interactor.interface";
import { ExceptionBase } from "~/common/exceptions";
import { PrePostResponse } from "../response/reponse.type";






export class ExpressInteractor implements IInteractor {

  constructor(
    private readonly request: Request,
    private readonly response: Response,
  ){}

  ok<T>(args: T){
    this.response.status(200).json(args);
  }
  created(message: string, metadata: Record<string, any>) {
    this.response.sendStatus(201);
  }
  clientError(message: string, metadata: Record<string, any>) {
    this.response.status(400).json()
  }
  unauthorized(message: string, metadata: Record<string, any>) {
    throw new Error("Method not implemented.");
  }
  paymentRequired(message: string, metadata: Record<string, any>) {
    throw new Error("Method not implemented.");
  }
  forbidden(message: string, metadata: Record<string, any>) {
    throw new Error("Method not implemented.");
  }
  notFound(message: string, metadata: Record<string, any>) {
    throw new Error("Method not implemented.");
  }
  conflict(message: string, metadata: Record<string, any>) {
    throw new Error("Method not implemented.");
  }
  tooMany(message: string, metadata: Record<string, any>) {
    throw new Error("Method not implemented.");
  }
  fail(message: string, error: ExceptionBase, metadata: Record<string, any>) {
    throw new Error("Method not implemented.");
  }
  
}