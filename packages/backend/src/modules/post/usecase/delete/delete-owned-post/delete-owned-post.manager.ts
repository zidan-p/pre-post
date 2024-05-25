import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteOwnedPostController } from "./delete-owned-post.controller";
import { DeleteOwnedPostUseCase } from "./delete-owned-post.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";


export class DeleteOwnedPostManager implements IUseCaseManager{

  private controller: DeleteOwnedPostController;
  private useCase: DeleteOwnedPostUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
  ){

    this.useCase = new DeleteOwnedPostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
    )

    this.controller = new DeleteOwnedPostController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteOwnedPostUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo(),
    )
  }

  createController(){
    return new DeleteOwnedPostController(this.useCase);
  }

}