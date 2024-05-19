import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetPostsByCurrentUserController } from "./get-posts-by-current-user.controller";
import { GetPostsByCurrentUserUseCase } from "./get-posts-by-current-user.use-case";
import { IPostRepositoryFactory } from "../../repository/post-creator.interface";


export class __usecase_PascalCase__Manager implements IUseCaseManager{

  private controller: GetPostsByCurrentUserController;
  private useCase: GetPostsByCurrentUserUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
  ){

    this.useCase = new GetPostsByCurrentUserUseCase(
      postRepoFactory.createPostRepo(),
      postRepoFactory.createUserRepo()
    );

    this.controller = new GetPostsByCurrentUserController(this.useCase);
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetPostsByCurrentUserUseCase(
      this.postRepoFactory.createPostRepo(),
      this.postRepoFactory.createUserRepo()
    )
  }

  createController(){
    return new GetPostsByCurrentUserController(this.useCase);
  }

}