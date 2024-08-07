import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeletePostController } from "./delete-post.controller";
import { DeletePostUseCase } from "./delete-post.use-case";
import { IPostRepositoryFactory } from "../../../repository/post-creator.interface";
import { IPostServiceFactory } from "~/modules/post/service/post-service.factory.interface";
import { IPostMapperPresenterFactory } from "~/modules/post/mappers/post-mapper.factory.interface";


export class DeletePostManager implements IUseCaseManager{

  private controller: DeletePostController;
  private useCase: DeletePostUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postServiceFactory: IPostServiceFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new DeletePostUseCase( 
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createPostImageRepo(),
      this.postServiceFactory.getStorageService()
    );

    this.controller = new DeletePostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeletePostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createPostImageRepo(),
      this.postServiceFactory.getStorageService()
    )
  }

  createController(){
    return new DeletePostController(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

}