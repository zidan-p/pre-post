import { z } from "zod";
import { Guard } from "~/common/core/Guard";
import { Result } from "~/common/core/Result";
import { AggregateRoot } from "~/common/domain/agregate-root.base";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { ValidationFailException } from "~/common/exceptions";
import { JWTToken, RefreshToken } from "~/modules/auth/domain/jwt.interface";
import { UserEmail } from "~/modules/auth/domain/user-email.value-object";
import { UserId } from "~/modules/auth/domain/user-id.value-object";
import { UserName } from "~/modules/auth/domain/user-name.value-object";
import { UserPassword } from "~/modules/auth/domain/user-password.value-object";

interface UserProps {
  email: UserEmail;
  username: UserName;
  password: UserPassword;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  isDeleted?: boolean;
  lastLogin?: Date;
}

export class User extends AggregateRoot<UserProps> {

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

  get accessToken (): string | null {
    return this.props.accessToken ?? null;
  }

  get isDeleted (): boolean {
    return this.props.isDeleted ?? false;
  }

  get isEmailVerified (): boolean {
    return this.props.isEmailVerified ?? false;
  }

  get isAdminUser (): boolean {
    return this.props.isAdminUser ?? false;
  }

  get lastLogin (): Date | null {
    return this.props.lastLogin ?? null;
  }

  get refreshToken (): RefreshToken | null {
    return this.props.refreshToken ?? null;
  }

  public isLoggedIn (): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken
  }

  public setAccessToken (token: JWTToken, refreshToken: RefreshToken): void {
    // this.addDomainEvent(new UserLoggedIn(this));
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  public delete (): void {
    if (!this.props.isDeleted) {
      // this.addDomainEvent(new UserDeleted(this));
      this.props.isDeleted = true;
    }
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

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
    const user = new User({
      ...props,
      isDeleted: props.isDeleted ? props.isDeleted : false,
      isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
      isAdminUser: props.isAdminUser ? props.isAdminUser : false
    }, id);

    // if (isNewUser) {
    //   user.addDomainEvent(new UserCreated(user));
    // }

    return Result.ok<User>(user);
  }
}