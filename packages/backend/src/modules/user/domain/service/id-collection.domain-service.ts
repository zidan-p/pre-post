import { Result } from "~/common/core/result";
import { ArgumentInvalidException, ArgumentNotProvidedException, ParseException } from "~/common/exceptions";
import { UserId } from "../user-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";



export class IdCollectionDomainService {

  filterIdCollection(idCollection: string[] | undefined): Result<UserId[]>{
    if(!idCollection) return Result.fail(new ArgumentNotProvidedException("invalid id collection", undefined, {userIds: idCollection}));
    if(!Array.isArray(idCollection)) return Result.fail(new ArgumentInvalidException("invalid id collection", undefined, {userIds: idCollection}));

    const userIdCollectionOrError = idCollection.map(id => UserId.create(new UniqueEntityID(id)));
    const userIdCollectionBuilderResult = Result.combine(userIdCollectionOrError);

    if(userIdCollectionBuilderResult.isFailure){
      return Result.fail(new ParseException(["string", "userId"]));
    }

    const userIdCollection = Result.getCombinedValue(userIdCollectionOrError);

    return Result.ok(userIdCollection);
  }
}