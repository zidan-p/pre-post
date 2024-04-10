import express, { Router } from 'express';
import { authControllerFactory } from '../creator/controller.creator';
import { ExpressInteractor } from '~/common/infra/http/interactor/express.interactor';



const authRouter = Router();

// const loginController = authControllerFactory.createLoginController();
authRouter.post(
  "/login", 
  (req, res) => authControllerFactory
    .getLoginController()
    .executeRequest(new ExpressInteractor(req, res))
);

authRouter.post(
  "/refresh-token", 
  (req, res) => authControllerFactory
    .getRefreshTokenController()
    .executeRequest(new ExpressInteractor(req, res))
);

export {authRouter};