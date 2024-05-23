import { BaseController } from "~/common/core/controller.base";
import { IPostRepositoryFactory } from "../../repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "../../mappers/post-mapper.factory.interface";
import { UseCase } from "~/common/core/use-case";
import { IPostRepo } from "../../repository/post.repository.port";
import { IPresenterMapper } from "~/common/core/mapper";
import { Post } from "../../domain/post.agregate-root";
import { IUseCaseManager } from "~/common/core/use-case.manager.interface";

// https://stackoverflow.com/questions/37654840/constructor-provides-no-match-for-signature-new

type PostMapper<TDomain extends Post> = IPresenterMapper<TDomain, any>;


type ControllerClass = new (useCase: UseCase<any, any>, mapper: PostMapper<Post>) => BaseController<any, any>;

type UsecaseClass = new (postRepo: IPostRepo) => UseCase<any, any>;


export abstract class PostAndPaginateManagerBase implements IUseCaseManager{


  controller: BaseController;
  useCase: UseCase<any, any>;

  constructor(
    protected controllerClass: ControllerClass,
    protected useCaseClass: UsecaseClass,
    protected postRepoFactory: IPostRepositoryFactory,
    protected postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

    this

    this.useCase = new this.useCaseClass(
      this.postRepoFactory.createPostRepo(),
    )

    this.controller = new this.controllerClass(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }

  getUseCase(){return this.useCase};
  getController(){ return this.controller}

  getNewUseCaseInstance(){
    return new this.useCaseClass(
      this.postRepoFactory.createPostRepo(),
    )
  }

  createController(){
    return new this.controllerClass(
      this.useCase,
      this.postMapperPresenterFactory.createPostMapper()
    );
  }
}