import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetManyUserDTORequest } from "./get-many-user.dto";
import { GetManyUserResponse } from "./get-many-user.response";
import { IUserRepo } from "~/modules/user/repository/user.respository.port";
import { GetManyUserUseCaseErrors } from "./get-many-user.error";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { UserId } from "~/modules/auth/domain/user-id.value-object";
import { prePostLogger } from "~/common/core/logger.entry";


export class GetManyUserUseCase implements UseCase<GetManyUserDTORequest, Promise<GetManyUserResponse>>{

  constructor(
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: GetManyUserDTORequest): Promise<GetManyUserResponse> {
    try{
      const idCollection = request?.query?.userIds;
      if(!idCollection) return right(Result.ok({users: []}));
      if(!Array.isArray(idCollection)) return left(new GetManyUserUseCaseErrors.InvalidUserIdValue(idCollection));

      const userIdCollectionOrError = idCollection.map(id => UserId.create(new UniqueEntityID(id)));

      const userIdCollectionBuilderResult = Result.combine(userIdCollectionOrError);

      if(userIdCollectionBuilderResult.isFailure){
        return left(new GetManyUserUseCaseErrors.IssueWhenBuilding("There are issue when building user id collection"));
      }

      const userIdCollection = Result.getCombinedValue(userIdCollectionOrError);

      const users = await this.userRepo.find({whereIncluded: {userId: userIdCollection}});

      if(users.length !== userIdCollection.length){
        return left(new GetManyUserUseCaseErrors.SomeUserNotFound(idCollection));
      }

      return right(Result.ok({users}));
    } catch (error) {
      prePostLogger.error(error);
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}