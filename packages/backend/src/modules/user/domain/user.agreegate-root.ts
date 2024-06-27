import { AggregateRoot } from "~/common/domain/agregate-root.base";
import { UserEmail } from "./user-email.value-object";
import { UserName } from "./user-name.value-object";
import { UserPassword } from "./user-password.value-object";
import { RoleValue } from "~/common/core/role.const";
import { UserId } from "./user-id.value-object";
import { Guard } from "~/common/core/guard";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { Result } from "~/common/core/result";
import { ValidationFailException } from "~/common/exceptions";




interface UserProps{
  email: UserEmail,
  username: UserName,
  password: UserPassword,
  role: RoleValue,
  isDeleted?: boolean
}

export interface UserPropsWithId extends UserProps{
  userId: UserId;
}




export class User extends AggregateRoot<UserProps>{
  get userId (): UserId {
    return UserId.create(this._id)
      .getValue();
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get username (): UserName {
    return this.props.username;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get role(){
    return this.props.role;
  }


  public delete (): void {
    if (!this.props.isDeleted) {
      // this.addDomainEvent(new UserDeleted(this));
      this.props.isDeleted = true;
    }
  }


  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'username' },
      { argument: props.email, argumentName: 'email' }
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(new ValidationFailException("validation failure when guard user", guardResult.getErrorValue()))
    }

    const isNewUser = !!id === false;
    const user = new User({
      ...props,
      isDeleted: props.isDeleted ? props.isDeleted : false,
    }, id);

    // if (isNewUser) {
    //   user.addDomainEvent(new UserCreated(user));
    // }

    return Result.ok<User>(user);
  }
}
