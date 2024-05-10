import { BaseController } from "~/common/core/Controller.base";
import { CreatePostUseCase } from "./update-post.use-case";
import { CreatePostUseCaseErrors } from "./update-post.error";



export class CreatePostController extends BaseController {

  private useCase: CreatePostUseCase;
  
  constructor(useCase: CreatePostUseCase){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    
    const payloadBody = this.getBody() as CreatePostBody;
    const payloadFiles = this.getFiles("image") as CreatePostFiles;

    try {
      const result = await this.useCase.execute({body: payloadBody, files: payloadFiles});
      
      if(result.isLeft){
        const error = result.value;
        const exception = error.getErrorValue();

        switch(true){
          case error instanceof CreatePostUseCaseErrors.InvalidProperties:
          case error instanceof CreatePostUseCaseErrors.InvalidImageManagerProps:
          case error instanceof CreatePostUseCaseErrors.InvalidImageProperties:
            return this.clientError(exception.message, exception.cause);
            break;
          
          case error instanceof CreatePostUseCaseErrors.FailBuildingPost:
            return this.fail(exception.message, exception);
            break;
          
          case error instanceof CreatePostUseCaseErrors.UserNotFound:
            return this.notFound(exception.message, exception.toJSON());
            break;
          
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      const dto = result.value;
      return this.ok({postId: dto.getValue().postId});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}