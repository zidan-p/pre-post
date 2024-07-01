import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRouter } from '~/modules/auth/infra/http/routes';
import { postRouter, userPostRouter as postUserRouter } from '~/modules/post/infra/http/routes';
import { userRouter } from '~/modules/user/infra/http/routes';


const v1 = express.Router();

v1.use("/auth", authRouter);
v1.use("/posts", postRouter);
v1.use("/users", userRouter ,postUserRouter);

export {v1}