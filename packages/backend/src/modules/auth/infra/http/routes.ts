import express from 'express';
import { authControllerFactory } from '../creator/controller.creator';



const authRouter = express.Router();

authRouter.post("login", authControllerFactory.createLoginController);


export {authRouter};