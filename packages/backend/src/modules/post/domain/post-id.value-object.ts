import { Guard } from "~/common/core/Guard";
import { Result } from "~/common/core/Result";
import { ValueObject } from "~/common/domain/Value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { ArgumentNotProvidedException } from "~/common/exceptions";






export class PostId extends ValueObject<{value: UniqueEntityID}>{
  getStringValue (): string {
    return this.props.value.toString();
  }

  getValue (): UniqueEntityID {
    return this.props.value;
  }

  private constructor (value: UniqueEntityID) {
    super({ value });
  }

  public static create (value: UniqueEntityID): Result<PostId> {
    let guardResult = Guard.againstNullOrUndefined(value, 'value');
    if (guardResult.isFailure) {
      return Result.fail<PostId>( new ArgumentNotProvidedException(guardResult.getErrorValue().message))
    }
    return Result.ok<PostId>(new PostId(value));
  }
}