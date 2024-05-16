import { BaseController } from "~/common/core/Controller.base";
import { UpdatePostUseCase } from "./update-post.use-case";
import { UpdatePostBody, UpdatePostFiles, UpdatePostParam } from "./update-post.dto";
import { UpdatePostUseCaseErrors } from "./update-post.error";
import { IPresenterMapper } from "~/common/core/Mapper";
import { Post } from "../../domain/post.agregate-root";



export class UpdatePostController extends BaseController {

  private useCase: UpdatePostUseCase;
  private postPresenterMapper: IPresenterMapper<Post, any>;
  
  constructor(useCase: UpdatePostUseCase, postMapper: IPresenterMapper<Post, any>){
    super();
    this.useCase = useCase;
    this.postPresenterMapper = postMapper;
  }


  async executeImpl(){
    
    const payloadBody = this.getBody() as UpdatePostBody;
    const payloadFiles = this.getFiles() as UpdatePostFiles;
    const param = this.getParams() as unknown as UpdatePostParam;

    try {
      const result = await this.useCase.execute({body: payloadBody, files: payloadFiles, param});
      
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
          
          case error instanceof UpdatePostUseCaseErrors.PostNotFound:
            return this.notFound(exception.message, exception.toJSON());
            break;
          
          default:
            console.log(exception);
            return this.fail("unexpected error", exception);
          
        }
      }

      const dto = result.value;
      const presenterPost = this.postPresenterMapper.toPresentation(dto.getValue().post);
      return this.ok({post: presenterPost});
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}