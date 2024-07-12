import { Router } from "express";
import { authService } from "~/common/infra/http/auth";
import { userUsecaseManagerFactory } from "../loader/main-loader";
import { GET_LIST_USER } from "../../usecase/get/get-list-user";
import { GET_USER } from "../../usecase/get/get-user";
import { GET_MANY_USER } from "../../usecase/get/get-many-user";
import { CREATE_USER } from "../../usecase/create/create-user";
import { DELETE_USER } from "../../usecase/delete/delete-user";
import { DELETE_MANY_USER } from "../../usecase/delete/delete-many-user";
import { UPDATE_MANY_USER } from "../../usecase/update/update-many-user";
import { UPDATE_USER } from "../../usecase/update/update-user";









export const userRouter = Router();



userRouter.get("/many", authService.jwtOptionalAuth(), userUsecaseManagerFactory.executeRequest(GET_MANY_USER));
// userRouter.get("/many", authService.jwtAuth(), userUsecaseManagerFactory.createController(GET_MANY_USER));
userRouter.get("/:userId", authService.jwtOptionalAuth(), userUsecaseManagerFactory.executeRequest(GET_USER));
// userRouter.get("/", authService.jwtAuth(), userUsecaseManagerFactory.executeRequest(GET_LIST_USER));
userRouter.get("/", authService.jwtOptionalAuth(), userUsecaseManagerFactory.executeNewRequest(GET_LIST_USER));
userRouter.post("/", authService.jwtAuth(), userUsecaseManagerFactory.executeRequest(CREATE_USER));
userRouter.delete("/:userId", authService.jwtAuth(), userUsecaseManagerFactory.executeRequest(DELETE_USER));
userRouter.delete("/", authService.jwtAuth(), userUsecaseManagerFactory.executeRequest(DELETE_MANY_USER));
userRouter.put("/:userId", authService.jwtAuth(), userUsecaseManagerFactory.executeRequest(UPDATE_USER));
userRouter.put("/", authService.jwtAuth(), userUsecaseManagerFactory.executeRequest(UPDATE_MANY_USER));