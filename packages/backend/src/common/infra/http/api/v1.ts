import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRouter } from '~/modules/auth/infra/http/routes';


const v1 = express();

v1.use(bodyParser.json())
v1.use(bodyParser.urlencoded({ extended: true }))
v1.use(cors({origin: "*"}));


v1.use("auth", authRouter);

export {v1}