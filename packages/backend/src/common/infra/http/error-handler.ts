import { ErrorRequestHandler, RequestHandler } from "express";
import { ExpressInteractor } from "./interactor/express.interactor";
import multer from "multer";
import { ExceptionBase } from "~/common/exceptions";




/**
 * register global error handler here.
 * @param err error object from prevous route
 * @param req -
 * @param res -
 * @param next -
 * @returns any
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("mencapai error handler")
  try {
    console.log(err?.name);
    const httpHandler = new ExpressInteractor(req, res);

    if(err?.name === "AuthenticationError"){
      return httpHandler.unauthorized("Invalid Credentials", undefined)
    }
    
    // handler multer error
    if (err instanceof multer.MulterError) {
      return httpHandler.fail("Fail when uploading file", err as ExceptionBase, {field: err.field})
    } 
    
    console.log((err as Error)?.stack)
    return httpHandler.fail("Failed operation", err, {});
  } catch (error) {
    return res.status(500).json({error});
  }
}