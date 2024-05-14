import { BaseController } from "~/common/core/Controller.base";
import { RefreshTokenDTO } from "./refresh-token.dto";
import { RefreshTokenUseCase } from "./refresh-token.use-case";
import { RefresTokenUseCaseError } from "./refresh-token.error";





export class RefreshTokenController extends BaseController{

  constructor(private useCase: RefreshTokenUseCase){
    super();
  }

  async executeImpl(...args: any[]): Promise<any> {
    const payload = this.getBody() as RefreshTokenDTO;

    try {
      const result = await this.useCase.execute(payload);

      if (result.isLeft()) {
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof RefresTokenUseCaseError.ExpireRefreshToken:
            return this.unauthorized(exception.message, exception.metadata as Record<string, any>)
          
          case error instanceof RefresTokenUseCaseError.UserNotFound:
            return this.notFound(exception.message, exception.metadata  as Record<string, any>);

          case error instanceof RefresTokenUseCaseError.MalformedToken:
            console.error(exception);
            return this.clientError(exception.message, exception.metadata  as Record<string, any>);

          default:
            return this.fail(exception.message, exception);
        }
        
      } else {
        const dto = result.value
        return this.ok(dto.getValue());
      }
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}