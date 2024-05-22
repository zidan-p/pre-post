import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { DeleteManyOwnedPostsController } from "./delete-many-owned-posts.controller";
import { DeleteManyOwnedPostsUseCase } from "./delete-many-owned-posts.use-case";
import { IPostRepositoryFactory } from "~/modules/post/repository/post-creator.interface";


export class DeleteManyOwnedPostsManager implements IUseCaseManager{

  private controller: DeleteManyOwnedPostsController;
  private useCase: DeleteManyOwnedPostsUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory
  ){

    this.useCase = new DeleteManyOwnedPostsUseCase(
      this.postRepoFactory.createPostRepo()
    )

    this.controller = new DeleteManyOwnedPostsController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new DeleteManyOwnedPostsUseCase(
      this.postRepoFactory.createPostRepo()
    )
  }

  createController(){
    return new DeleteManyOwnedPostsController(this.useCase);
  }

}