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

        switch(true){
          case error instanceof RefresTokenUseCaseError.ExpireRefreshToken:
            return this.unauthorized(error.getErrorValue().message, error.getErrorValue().metadata)
          
          case error instanceof RefresTokenUseCaseError.UserNotFound:
            return this.notFound(error.getErrorValue().message, error.getErrorValue().metadata);

          case error instanceof RefresTokenUseCaseError.MalformedToken:
            console.error(error.getErrorValue());
            return this.clientError(error.getErrorValue().message, error.getErrorValue().metadata);

          default:
            return this.fail(error.getErrorValue().message, error.getErrorValue());
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