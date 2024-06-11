import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRouter } from '~/modules/auth/infra/http/routes';
import { postRouter, userPostRouter } from '~/modules/post/infra/http/routes';


const v1 = express.Router();

v1.use("/auth", authRouter);
v1.use("/posts", postRouter);
v1.use("/users", userPostRouter);

export {v1}