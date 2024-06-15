import { ErrorRequestHandler, RequestHandler } from "express";
import { ExpressInteractor } from "./interactor/express.interactor";
import multer from "multer";
import { ExceptionBase } from "~/common/exceptions";





export const  errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  try {
    const httpHandler = new ExpressInteractor(req, res);
    
    if (err instanceof multer.MulterError) {
      return httpHandler.fail("Fail when uploading file", err as ExceptionBase, {field: err.field})
    } 
    
    return httpHandler.notFound("Your Path isn't here, try another", {});
  } catch (error) {
    return res.status(500).json({error});
  }
}