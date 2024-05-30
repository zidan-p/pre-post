import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { UpdateManyPostController } from "./update-many-post.controller";
import { UpdateManyPostUseCase } from "./update-many-post.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";


export class UpdateManyPostManager implements IUseCaseManager{

  private controller: UpdateManyPostController;
  private useCase: UpdateManyPostUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory
  ){

    this.useCase = new UpdateManyPostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createPostImageRepo(),
    )

    this.controller = new UpdateManyPostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new UpdateManyPostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createPostImageRepo(),
    )
  }

  createController(){
    return new UpdateManyPostController(this.useCase);
  }

}