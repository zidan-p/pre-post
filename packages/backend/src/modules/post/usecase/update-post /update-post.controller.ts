import { BaseController } from "~/common/core/Controller.base";
import { UpdatePostUseCase } from "./update-post.use-case";
import { UpdatePostBody, UpdatePostFiles } from "./update-post.dto";
import { UpdatePostUseCaseErrors } from "./update-post.error";



export class UpdatePostController extends BaseController {

  private useCase: UpdatePostUseCase;
  
  constructor(useCase: UpdatePostUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    
    const payloadBody = this.getBody() as UpdatePostBody;
    const payloadFiles = this.getFiles() as UpdatePostFiles;

    try {
      const result = await this.useCase.execute({body: payloadBody, files: payloadFiles});
      
      if(result.isLeft()){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof UpdatePostUseCaseErrors.InvalidProperties:
          case error instanceof UpdatePostUseCaseErrors.InvalidImageManagerProps:
          case error instanceof UpdatePostUseCaseErrors.InvalidImageProperties:
            return this.clientError(exception.message, exception.cause);
            break;
          
          case error instanceof UpdatePostUseCaseErrors.FailBuildingPost:
            return this.fail(exception.message, exception);
            break;
          
          case error instanceof UpdatePostUseCaseErrors.UserNotFound:
            return this.notFound(exception.message, exception.toJSON());
            break;
          
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      const dto = result.value;
      return this.ok({post_id: dto.getValue().postId});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}