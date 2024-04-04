import { BaseController } from "~/common/core/Controller.base";
import { LoginUseCase } from "./login.use-case";
import { IInteractor } from "~/common/core/Interactor.interface";
import { LoginDTO } from "./login.dto";
import { LoginUseCaseErrors } from "./login.error";


export class LoginController extends BaseController {
  
  private useCase: LoginUseCase;
  
  constructor(useCase: LoginUseCase){
    super();
    this.useCase = useCase;
  }
  
  async executeImpl(payloadBody: LoginDTO) {

    try {
      const result = await this.useCase.execute(payloadBody);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case LoginUseCaseErrors.EmailOrPasswordError:
            return this.notFound(error.getErrorValue().message, error.getErrorValue()?.metadata);
          default:
            return this.fail(error.getErrorValue().message, error.getErrorValue());
        }
        
      } else {
        const dto = result.value
        return this.ok(dto.getValue());
      }

    } catch (err) {
      return this.fail("unexpexted error eccured");
    }
  }

}