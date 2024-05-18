import { BaseController } from "./controller.base";
import { UseCase } from "./use-case";

export interface IUseCaseManager{

  getController : () => BaseController;

  getUseCase : () => UseCase<any, any>;

  /**
   * create new use case instance based on stored repository and service value
   **/
  getNewUseCaseInstance : () => UseCase<any, any>;

  /**
   * create new controller based on stored instance value
   */
  createController ?: () => BaseController;
}