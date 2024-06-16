import { Handler } from "express";
import { ExpressInteractor } from "./interactor/express.interactor";





/**
 * handle not found error.
 * like when you consume "/non-existsting-path" it will return result from bellow
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const notFoundHandler: Handler = (req, res, next) => {
  try {
    const httpHandler = new ExpressInteractor(req, res);
    
    return httpHandler.notFound("Your Path isn't here, try another", {});
  } catch (error) {
    return res.status(500).json({error});
  }
}