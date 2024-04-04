import express, { Router } from 'express';
import { authControllerFactory } from '../creator/controller.creator';



const authRouter = Router();

authRouter.post("/login", (req, res) => authControllerFactory.createLoginController(req, res).execute());


export {authRouter};