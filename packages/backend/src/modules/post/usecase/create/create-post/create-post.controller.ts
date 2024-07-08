import { BaseController } from "~/common/core/controller.base";
import { CreatePostUseCase } from "./create-post.use-case";
import { CreatePostBody, CreatePostFiles } from "./create-post.dto";
import { CreatePostUseCaseErrors } from "./create-post.error";
import { IPresenterMapper } from "~/common/core/mapper";
import { Post } from "~/modules/post/domain/post.agregate-root";



export class CreatePostController<TPostRaw extends Record<string, any>> extends BaseController {

  private useCase: CreatePostUseCase;
  
  constructor(
    useCase: CreatePostUseCase,
    private readonly postMapper: IPresenterMapper<Post, TPostRaw>,
  ){
    super();
    this.useCase = useCase;
  }


  async executeImpl(){
    
    const payloadBody = this.getBody() as CreatePostBody;
    const payloadFiles = this.getSingleFile();

    try {
      const result = await this.useCase.execute({body: payloadBody, files: {postImage: payloadFiles ?? undefined}});
      
      if(result.isLeft()){
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
      const postsPresenter = this.postMapper.toPresentation(dto.getValue().post);
      // return this.ok({postId: dto.getValue().postId});
      return this.okBuild({data: postsPresenter})
    } catch (error) {
      return this.fail("unexpexted error eccured", error);
    }
  }
  
}