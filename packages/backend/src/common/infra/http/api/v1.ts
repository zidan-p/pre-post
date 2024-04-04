import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRouter } from '~/modules/auth/infra/http/routes';


const v1 = express.Router();

v1.use("/auth", authRouter);

export {v1}