import { AuthServiceImpl } from "../../service/implementations/auth.service"
import { AuthControllerFactory } from "./controller.factory"
import { userRepository } from "./repository.creator"


export const authControllerFactory = new AuthControllerFactory(userRepository, new AuthServiceImpl());