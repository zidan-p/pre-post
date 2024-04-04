import express, { Router } from 'express';
import { authControllerFactory } from '../creator/controller.creator';
import { ExpressInteractor } from '~/common/infra/http/interactor/express.interactor';



const authRouter = Router();

const loginController = authControllerFactory.createLoginController();
authRouter.post("/login", (req, res) => loginController.executeRequest(new ExpressInteractor(req, res)));


export {authRouter};