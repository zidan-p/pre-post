import { Router } from "express";
import { postUseCaseManagerFactory } from "../loader/main-loader";
import { CREATE_POST } from "../../usecase/create/create-post/create-post.type";
import { UPDATE_POST } from "../../usecase/update/update-post ";




export const postRouter = Router();

// note, serialize upload image fulfill 
postRouter.post("/", postUseCaseManagerFactory.executeRequest(CREATE_POST));
postRouter.put("/:postId", postUseCaseManagerFactory.executeRequest(UPDATE_POST))