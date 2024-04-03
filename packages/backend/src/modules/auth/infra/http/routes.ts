import express, { Router } from 'express';
import { authControllerFactory } from '../creator/controller.creator';



const authRouter = Router();

authRouter.post("login", authControllerFactory.createLoginController);


export {authRouter};