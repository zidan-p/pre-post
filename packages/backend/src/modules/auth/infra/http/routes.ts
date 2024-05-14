import express, { Router } from 'express';
import { authUseCaseManagerFactory } from '../creator/main.creator';
import { LOGIN } from '../../usecase/login';
import { REFRESH_TOKEN } from '../../usecase/refresh-token';


const authRouter = Router();

authRouter.post("/login", authUseCaseManagerFactory.executeRequest(LOGIN));
authRouter.post("/refresh-token", authUseCaseManagerFactory.executeRequest(REFRESH_TOKEN));

export {authRouter};