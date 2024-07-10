import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { DeleteManyUserDTORequest } from "./delete-many-user.dto";
import { DeleteManyUserResponse } from "./delete-many-user.response";
import { IUserRepo } from "~/modules/user/repository/user.respository.port";
import { DeleteManyUserUseCaseErrors } from "./delete-many-user.error";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { UserId } from "~/modules/user/domain/user-id.value-object";


export class DeleteManyUserUseCase implements UseCase<DeleteManyUserDTORequest, Promise<DeleteManyUserResponse>>{

  constructor(
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: DeleteManyUserDTORequest): Promise<DeleteManyUserResponse> {
    try{

      const idCollection = request?.query?.userIds;

      // when no collection id, return empty post.
      // no needed for ownership checking
      if(!idCollection) return right(Result.ok({userIds: []}));
      if(!Array.isArray(idCollection)) return left(new DeleteManyUserUseCaseErrors.InvalidUserIdValue(idCollection));

      const userIdCollectionOrError = idCollection.map(id => UserId.create(new UniqueEntityID(id)));
      const userIdCollectionBuilderResult = Result.combine(userIdCollectionOrError);

      if(userIdCollectionBuilderResult.isFailure){
        return left(new DeleteManyUserUseCaseErrors.IssueWhenBuilding("There are issue when building user id collection"));
      }

      const userIdCollection = Result.getCombinedValue(userIdCollectionOrError);

      const users = await this.userRepo.find({whereIncluded: {userId: userIdCollection}});

      // check if there are some miss user, beacause the id is assumed will not same among all records
      if(users.length !== userIdCollection.length){
        return left(new DeleteManyUserUseCaseErrors.SomeUserNotFound(idCollection));
      }

      for(const userKey in users) users[userKey].delete();

      const result = await this.userRepo.saveCollection(users);

      return right(Result.ok({userIds: idCollection}));
    } catch (error) {
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}