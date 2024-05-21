import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { PublishPostController } from "./publish-post.controller";
import { PublishPostUseCase } from "./publish-post.use-case";
import { IPostRepositoryFactory } from "../../../repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "../../../mappers/post-mapper.factory.interface";


export class PublishPostManager<PostOutputDto extends Record<string, any> = Record<string, any>> implements IUseCaseManager{

  private controller: PublishPostController;
  private useCase: PublishPostUseCase;

  constructor(
    private readonly postRepositoryFactory: IPostRepositoryFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new PublishPostUseCase(postRepositoryFactory.createPostRepo())

    this.controller = new PublishPostController<PostOutputDto>(
      this.useCase,
      postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new PublishPostUseCase(this.postRepositoryFactory.createPostRepo())
  }

  createController(){
    return new PublishPostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

}