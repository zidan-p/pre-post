import { AggregateRoot } from "~/common/domain/agregate-root.base";
import { UserId } from "./user-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { Result } from "~/common/core/result";
import { Guard } from "~/common/core/guard";
import { ValidationFailException } from "~/common/exceptions";

interface UserProps {
  email: string;
  username: string;
  isAdminUser: boolean;
}


export class User extends AggregateRoot<UserProps>{

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get userId (): UserId {
    return UserId.create(this._id)
      .getValue();
  }

  get email(): string { return this.props.email;}
  get username(): string { return this.props.username}
  get isAdminUser(): boolean { return this.props.isAdminUser}

  // new user not providing the id
  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'username' },
      { argument: props.email, argumentName: 'email' }
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(new ValidationFailException("validation failure when guard user", guardResult.getErrorValue()))
    }

    const isNewUser = !!id === false;
    const user = new User(props, id);

    return Result.ok<User>(user);
  }
  

}



