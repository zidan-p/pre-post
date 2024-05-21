import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UnpublishPostController } from "./unpublish-post.controller";
import { UnpublishPostUseCase } from "./unpublish-post.use-case";
import { IPostRepositoryFactory } from "../../../repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "../../../mappers/post-mapper.factory.interface";


export class UnpublishPostManager<TPostOutputDto extends Record<string, any> = Record<string, any>> implements IUseCaseManager{

  private controller: UnpublishPostController;
  private useCase: UnpublishPostUseCase;

  constructor(
    private readonly postRepositoryFactory: IPostRepositoryFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new UnpublishPostUseCase(
      this.postRepositoryFactory.createPostRepo(),
      this.postRepositoryFactory.createUserRepo(),
    )

    this.controller = new UnpublishPostController<TPostOutputDto>(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UnpublishPostUseCase(
      this.postRepositoryFactory.createPostRepo(),
      this.postRepositoryFactory.createUserRepo(),
    )
  }

  createController(){
    return new UnpublishPostController<TPostOutputDto>(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

}