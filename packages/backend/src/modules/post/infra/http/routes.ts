import { Router } from "express";
import { postUseCaseManagerFactory } from "../loader/main-loader";
import { CREATE_POST } from "../../usecase/create/create-post/create-post.type";
import { UPDATE_POST } from "../../usecase/update/update-post ";
import { GET_ALL_PUBLISHED_POSTS } from "../../usecase/get/get-all-published-posts";
import { GET_ALL_POST_LIST } from "../../usecase/get/get-all-post-list";
import { GET_POSTS_BY_OWNER } from "../../usecase/get/get-posts-by-owner";
import { GET_PUBLISHED_POST_BY_OWNER } from "../../usecase/get/get-published-post-by-owner";
import { GET_POSTS_BY_CURRENT_USER } from "../../usecase/get/get-posts-by-current-user";
import { GET_MANY_POSTS } from "../../usecase/get/get-many-posts";
import { PUBLISH_POST } from "../../usecase/publish/publish-post";
import { UNPUBLISH_POST } from "../../usecase/publish/unpublish-post/unpublish-post.type";
import { PUBLISH_MANY_POSTS } from "../../usecase/publish/publish-many-posts";
import { PUBLISH_MANY_OWNED_POSTS } from "../../usecase/publish/publish-many-owned-posts";
import { UNPUBLISH_MANY_POSTS } from "../../usecase/publish/unpublish-many-posts";
import { UNPUBLISH_MANY_OWNED_POSTS } from "../../usecase/publish/unpublish-many-owned-posts";
import { UPDATE_MANY_POST } from "../../usecase/update/update-many-post";
import { DELETE_MANY_POSTS } from "../../usecase/delete/delete-many-posts";
import { DELETE_MANY_OWNED_POSTS } from "../../usecase/delete/delete-many-owned-posts";
import { DELETE_POST } from "../../usecase/delete/delete-post/delete-post.type";
import { DELETE_OWNED_POST } from "../../usecase/delete/delete-owned-post";
import { uploadImagePost } from "./storage.config";
import { authService } from "~/common/infra/http/auth";




export const postRouter = Router();
export const userPostRouter = Router();

// postRouter.get("/", (req,res) => {
//   switch(req.user?.role){
//     case "ADMIN" : return postUseCaseManagerFactory.getController(GET_ALL_POST_LIST)(req,res);
//     case "USER" : return postUseCaseManagerFactory.getController(GET_ALL_PUBLISHED_POSTS)(req,res);
//     default: return res.status(403).json({message: "forbidden credential"});
//   }
// }) 

postRouter.get("/", (req,res) => {
  switch(req.user?.role){
    case "ADMIN" : return postUseCaseManagerFactory.getController(GET_ALL_POST_LIST)(req,res);
    default : return postUseCaseManagerFactory.getController(GET_ALL_PUBLISHED_POSTS)(req,res);
    // default: return res.status(403).json({message: "forbidden credential"})
  }
})

postRouter.get("/many", postUseCaseManagerFactory.executeRequest(GET_MANY_POSTS));
postRouter.get("/me",authService.jwtAuth(), postUseCaseManagerFactory.executeRequest(GET_POSTS_BY_CURRENT_USER));

postRouter.post("/",uploadImagePost.single("postImage"), postUseCaseManagerFactory.executeRequest(CREATE_POST));

postRouter.put("/:postId", postUseCaseManagerFactory.executeRequest(UPDATE_POST));
postRouter.put("/", postUseCaseManagerFactory.executeRequest(UPDATE_MANY_POST));

postRouter.put("/:postId/publish", postUseCaseManagerFactory.executeRequest(PUBLISH_POST));
postRouter.put("/:postId/unpublish", postUseCaseManagerFactory.executeRequest(UNPUBLISH_POST));
postRouter.put("publish", (req, res) => {
  switch(req.user?.role){
    case "ADMIN" : return postUseCaseManagerFactory.getController(PUBLISH_MANY_POSTS)(req,res);
    case "USER" : return postUseCaseManagerFactory.getController(PUBLISH_MANY_OWNED_POSTS)(req,res);
    default: return res.status(403).json({message: "forbidden credential"});
  }
});
postRouter.put("unpublish", (req, res) => {
  switch(req.user?.role){
    case "ADMIN" : return postUseCaseManagerFactory.getController(UNPUBLISH_MANY_POSTS)(req,res);
    case "USER" : return postUseCaseManagerFactory.getController(UNPUBLISH_MANY_OWNED_POSTS)(req,res);
    default: return res.status(403).json({message: "forbidden credential"});
  }
});

postRouter.delete("/", (req,res) => {
  switch(req.user?.role){
    case "ADMIN" : return postUseCaseManagerFactory.getController(DELETE_MANY_POSTS)(req,res);
    case "USER" : return postUseCaseManagerFactory.getController(DELETE_MANY_OWNED_POSTS)(req,res);
    default: return res.status(403).json({message: "forbidden credential"});
  }
})
postRouter.delete("/:postId", (req,res) => {
  switch(req.user?.role){
    case "ADMIN" : return postUseCaseManagerFactory.getController(DELETE_POST)(req,res);
    case "USER" : return postUseCaseManagerFactory.getController(DELETE_OWNED_POST)(req,res);
    default: return res.status(403).json({message: "forbidden credential"});
  }
})

// ----------- user Router -----------
userPostRouter.get("/:userId/posts/", (req, res) => {
  switch (req.user?.role) {
    case "ADMIN": return postUseCaseManagerFactory.getController(GET_POSTS_BY_OWNER)(req,res);
    default : return postUseCaseManagerFactory.getController(GET_PUBLISHED_POST_BY_OWNER)(req,res);
    // default: return res.status(403).json({message: "forbidden credential"});
  }
})