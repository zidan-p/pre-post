import { BaseController } from "~/common/core/controller.base";
import { CreateUserUseCase } from "./create-user.use-case";
import { CreateUserBody, CreateUserDTOEnd } from "./create-user.dto";
import { CreateUserUseCaseErrors } from "./create-user.error";



export class CreateUserController extends BaseController<CreateUserDTOEnd> {

  constructor(
    private useCase: CreateUserUseCase
  ){
    super();
  }


  async executeImpl(){
    const body = this.getBody() as CreateUserBody;
    try {
      const result = await this.useCase.execute({body});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof CreateUserUseCaseErrors.InvalidProperties:
          case error instanceof CreateUserUseCaseErrors.FieldNotProvided:
            return this.clientError(exception.message, exception.metadata as Record<string, any>);
          case error instanceof CreateUserUseCaseErrors.UserAlreadyExists:
            return this.conflict(exception.message, exception.metadata as Record<string, any>);
          case error instanceof CreateUserUseCaseErrors.FailBuildingUser:
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }
      // return this.ok(null, "Success usersentenceCase__");
      return this.okBuild();
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}