import { Router } from "express";
import { postUseCaseManagerFactory } from "../creator/main-create";
import { CREATE_POST } from "../../usecase/create-post/create-post.type";




const postRouter = Router();


postRouter.post("/", postUseCaseManagerFactory.executeRequest(CREATE_POST));