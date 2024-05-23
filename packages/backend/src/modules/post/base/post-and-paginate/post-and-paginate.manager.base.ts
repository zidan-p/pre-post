import { BaseController } from "~/common/core/controller.base";
import { IPostRepositoryFactory } from "../../repository/post-creator.interface";
import { IPostMapperPresenterFactory } from "../../mappers/post-mapper.factory.interface";
import { UseCase } from "~/common/core/use-case";
import { IPostRepo } from "../../repository/post.repository.port";
import { IPresenterMapper } from "~/common/core/mapper";
import { Post } from "../../domain/post.agregate-root";
import { IUseCaseManager } from "~/common/core/use-case.manager.interface";

// https://stackoverflow.com/questions/37654840/constructor-provides-no-match-for-signature-new


// worksround for infer class generic from constructor
// https://stackoverflow.com/questions/56043642/can-i-use-type-as-value-or-correctly-infer-generic-class-type-from-constructor
type PostMapper<TDomain extends Post> = IPresenterMapper<TDomain, any>;


type ControllerClass<TController, TUseCase> = new (useCase: TUseCase, mapper: PostMapper<Post>) => TController;

type UsecaseClass<TUseCase> = new (postRepo: IPostRepo) => TUseCase;


export abstract class PostAndPaginateManagerBase<TController extends BaseController<any, any>, TUsecase extends UseCase<any, any>> implements IUseCaseManager{


  controller: TController;
  useCase: TUsecase;

  constructor(
    protected controllerClass: ControllerClass<TController, TUsecase>,
    protected useCaseClass: UsecaseClass<TUsecase>,
    protected postRepoFactory: IPostRepositoryFactory,
    protected postMapperPresenterFactory: IPostMapperPresenterFactory
  ){

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