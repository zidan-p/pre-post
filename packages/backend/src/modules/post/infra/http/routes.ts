import { Router } from "express";
import { postUseCaseManagerFactory } from "../creator/main-creator";
import { CREATE_POST } from "../../usecase/create-post/create-post.type";
import { UPDATE_POST } from "../../usecase/update-post ";




const postRouter = Router();

// note, serialize upload image fulfill 
postRouter.post("/", postUseCaseManagerFactory.executeRequest(CREATE_POST));
postRouter.put("/:postId", postUseCaseManagerFactory.executeRequest(UPDATE_POST))