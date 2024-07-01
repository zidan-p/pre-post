import { BaseController } from "~/common/core/controller.base";
import { GetUserUseCase } from "./get-user.use-case";
import { GetUserDTOEnd, GetUserParams } from "./get-user.dto";
import { GetUserUseCaseErrors } from "./get-user.error";
import { IPresenterMapper } from "~/common/core/mapper";
import { User } from "~/modules/user/domain/user.agreegate-root";



export class GetUserController<TUserRaw = any> extends BaseController<GetUserDTOEnd> {

  constructor(
    private useCase: GetUserUseCase,
    private readonly userPresenterMapper: IPresenterMapper<User, Promise<TUserRaw>>
  ){
    super();
  }


  async executeImpl(){
    const params = this.getParams() as GetUserParams
    try {
      const result = await this.useCase.execute({params});
      
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
      console.log(value);
      const user = await this.userPresenterMapper.toPresentation(value?.user);
      console.log(user);
      return this.okBuild({data: user});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}