import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetPostsByCurrentUserController } from "./get-posts-by-current-user.controller";
import { GetPostsByCurrentUserUseCase } from "./get-posts-by-current-user.use-case";
import { IPostRepositoryFactory } from "../../repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "../../mappers/post-mapper.factory.interface";


export class GetPostsByCurrentUserManager<PostOutputDto extends Record<string, any> = Record<string, any>> implements IUseCaseManager{

  private controller: GetPostsByCurrentUserController;
  private useCase: GetPostsByCurrentUserUseCase;

  constructor(
    private readonly postRepoFactory: IPostRepositoryFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new GetPostsByCurrentUserUseCase(
      postRepoFactory.createPostRepo(),
      postRepoFactory.createUserRepo()
    );

    this.controller = new GetPostsByCurrentUserController<PostOutputDto>(
      this.useCase,
      postMapperPresenterFactory.createPostMapper()
    );
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
    return new GetPostsByCurrentUserController<PostOutputDto>(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

}