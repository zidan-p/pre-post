import { BaseController } from "~/common/core/controller.base";
import { GetUserUseCase } from "./get-user.use-case";
import { GetUserDTOEnd } from "./get-user.dto";
import { GetUserUseCaseErrors } from "./get-user.error";
import { IPresenterMapper } from "~/common/core/mapper";
import { User } from "~/modules/user/domain/user.agreegate-root";



export class GetUserController<TUserRaw = any> extends BaseController<GetUserDTOEnd> {

  constructor(
    private useCase: GetUserUseCase,
    private readonly userPresenterMapper: IPresenterMapper<User, TUserRaw>
  ){
    super();
  }


  async executeImpl(){

    try {
      const result = await this.useCase.execute({});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof GetUserUseCaseErrors.InvalidUserIdValue:
            return this.clientError(exception.message, exception?.metadata as Record<string, any>);
          case error instanceof GetUserUseCaseErrors.userNotFound:
            return this.notFound(exception.message, exception.metadata as Record<string, any>);
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      const value = result.value.getValue();
      const user = this.userPresenterMapper.toPresentation(value?.user)
      return this.okBuild({data: user});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}