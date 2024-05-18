import { BaseController } from "~/common/core/controller.base";
import { LoginUseCase } from "./login.use-case";
import { LoginDTO } from "./login.dto";
import { LoginUseCaseErrors } from "./login.error";


export class LoginController extends BaseController {
  
  private useCase: LoginUseCase;
  
  constructor(useCase: LoginUseCase){
    super();
    this.useCase = useCase;
  }
  
  async executeImpl() {

    const payloadBody = this.getBody() as LoginDTO;

    try {
      const result = await this.useCase.execute(payloadBody);

      if (result.isLeft()) {
        const error = result.value;
        const exception = error.getErrorValue();
        switch (true) {
          case error instanceof LoginUseCaseErrors.LoginValidationError:
            return this.clientError(
              exception.message, 
              exception.cause
            );
          case error instanceof LoginUseCaseErrors.EmailOrPasswordError:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);


          default:
            console.error(error);
            return this.fail("Unexpexted Error", exception)
            // return this.fail(exception.message, exception);
        }
        
      } else {
        const dto = result.value
        return this.ok(dto.getValue());
      }

    } catch (err) {
      return this.fail("unexpexted error eccured", err);
    }
  }

}