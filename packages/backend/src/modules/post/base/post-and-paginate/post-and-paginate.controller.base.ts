import { BaseController } from "~/common/core/controller.base";
import { IPostRepo } from "../../repository/post.repository.port";
import { UseCase } from "~/common/core/use-case";
import { Post } from "../../domain/post.agregate-root";
import { IPresenterMapper } from "~/common/core/mapper";
import { Either, Left, Result } from "~/common/core/result";
import { IPaginateReponse } from "~/common/types/paginate";



interface CommonPostAndPaginateDTOResponse {
  posts: Post[];
  paginate: IPaginateReponse
}

export interface CommonPostAndPaginateDTOEnd<TPostPresenter>{
  posts: TPostPresenter[];
  paginate: IPaginateReponse
}

type RequestUseCase<T> = T extends UseCase<any, Promise<infer R>> ? R : T

export abstract class PostAndPaginateControllerBase<
    TResponse extends Either<Left<any, any>, Result<CommonPostAndPaginateDTOResponse>>,
    TUseCase extends UseCase<any, any>,
    TPostRaw,
    DTOEnd extends any,
  > 
  extends BaseController<CommonPostAndPaginateDTOEnd<TPostRaw>, DTOEnd>
{

  abstract handleLeft(result: TResponse): any;
  abstract getUseCaseRequest<TRequest extends RequestUseCase<TUseCase>>(): TRequest;

  constructor(
    protected useCase: TUseCase, 
    protected postMapper: IPresenterMapper<Post, TPostRaw>
  ){
    super();
  }
  


  async executeImpl(){
    const request = this.getUseCaseRequest();
    try {
      const result = await this.useCase.execute(request) as TResponse;
      if(result.isLeft()){
        return this.handleLeft(result);
      }

      const data = result.value.getValue();
      const postPreseter = data.posts.map(post => this.postMapper.toPresentation(post));
      const paginate = data.paginate;
      return this.ok({paginate, posts: postPreseter});
    } catch (error) {
      return this.fail("unexpected error occured", error);
    }
  }


}

