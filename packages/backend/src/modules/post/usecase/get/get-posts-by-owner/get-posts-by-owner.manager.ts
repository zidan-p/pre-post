import { IUseCaseManager } from "~/common/core/use-case.manager.interface";
import { GetPostsByOwnerController } from "./get-posts-by-owner.controller";
import { GetPostsByOwnerUseCase } from "./get-posts-by-owner.use-case";
import { IPostRepositoryFactory } from "../../../repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "../../../mappers/post-mapper.factory.interface";


export class GetPostsByOwnerManager<PostOutputDto extends Record<string, any> = Record<string, any>> implements IUseCaseManager{

  private controller: GetPostsByOwnerController;
  private useCase: GetPostsByOwnerUseCase;

  constructor(
    private readonly postReposFactory: IPostRepositoryFactory,
    private readonly postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this.useCase = new GetPostsByOwnerUseCase(
      postReposFactory.createPostRepo(),
      postReposFactory.createUserRepo()
    )

    this.controller = new GetPostsByOwnerController<PostOutputDto>(
      this.useCase,
      postMapperPresenterFactory.createPostMapper(),
      postMapperPresenterFactory.createPaginateMapper(),
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new GetPostsByOwnerUseCase(
      this.postReposFactory.createPostRepo(),
      this.postReposFactory.createUserRepo()
    )
  }

  createController(){
    return new GetPostsByOwnerController<PostOutputDto>(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper(),
      this.postMapperPresenterFactory.createPaginateMapper(),
    );
  }

}