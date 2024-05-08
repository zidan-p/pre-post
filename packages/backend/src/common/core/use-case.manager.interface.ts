import { BaseController } from "./Controller.base";
import { UseCase } from "./UseCase";

export interface IUseCaseManager{

  getController ?: () => BaseController;

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