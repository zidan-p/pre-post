import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRouter } from '~/modules/auth/infra/http/routes';
import { postRouter } from '~/modules/post/infra/http/routes';


const v1 = express.Router();

v1.use("/auth", authRouter);
v1.use("/post", postRouter)

export {v1}