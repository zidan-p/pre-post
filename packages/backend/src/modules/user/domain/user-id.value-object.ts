import { Guard } from "~/common/core/guard";
import { Result } from "~/common/core/result";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { ValueObject } from "~/common/domain/value-object";
import { ArgumentInvalidException, ArgumentNotProvidedException, ParseException } from "~/common/exceptions";





export class UserId extends ValueObject<{ value: UniqueEntityID }> {

  getStringValue (): string {
    return this.props.value.toString();
  }

  getValue (): UniqueEntityID {
    return this.props.value;
  }

  private constructor (value: UniqueEntityID) {
    super({ value });
  }

  public static validateIdCollection(idCollection?: string[] | null): Result<UserId[], ArgumentInvalidException | ParseException>{
    if(!idCollection) 
      return Result.fail(new ArgumentNotProvidedException("invalid id collection", undefined, {userIds: idCollection}));
    
    if(!Array.isArray(idCollection)) 
      return Result.fail(new ArgumentInvalidException("invalid id collection", undefined, {userIds: idCollection}));

    const userIdCollectionOrError = idCollection.map(id => UserId.create(new UniqueEntityID(id)));
    const userIdCollectionBuilderResult = Result.combine(userIdCollectionOrError);

    if(userIdCollectionBuilderResult.isFailure){
      return Result.fail(new ParseException(["string", "userId"]));
    }

    const userIdCollection = Result.getCombinedValue(userIdCollectionOrError);

    return Result.ok(userIdCollection);
  }

  

  public static create (value: UniqueEntityID): Result<UserId> {
    let guardResult = Guard.againstNullOrUndefined(value, 'value');
    if (guardResult.isFailure) {
      return Result.fail<UserId>( new ArgumentNotProvidedException(guardResult.getErrorValue().message))
    }

    return Result.ok<UserId>(new UserId(value));
  }
}