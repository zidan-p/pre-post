import { AggregateRoot } from "~/common/domain/agregate-root.base";
import { UserEmail } from "./user-email.value-object";
import { UserName } from "./user-name.value-object";
import { UserPassword } from "./user-password.value-object";
import { Role, RoleValue } from "~/common/core/role.const";
import { UserId } from "./user-id.value-object";
import { Guard } from "~/common/core/guard";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { Result } from "~/common/core/result";
import { ArgumentInvalidException, ExceptionBase, ValidationFailException } from "~/common/exceptions";
import { UserEditableField, UserEditableFieldValueObject } from "./user-editable-field.interface";




export interface UserProps{
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

  set email (email: UserEmail) {
    this.props.email = email;
  }

  set username (username: UserName) {
    this.props.username = username;
  }

  set password (password: UserPassword) {
    this.props.password = password
  }

  set role(role: RoleValue){
    this.props.role = role;
  }

  public static validateEditableField(field: Partial<UserEditableField> ): Result<Partial<UserEditableFieldValueObject>, ArgumentInvalidException >{
    let userEmail: UserEmail | undefined;
    let userName: UserName | undefined;
    let userPassword: UserPassword | undefined;
    let userRole: RoleValue | undefined;

    if(field?.email) {
      const userEmailOrError = UserEmail.create(field.email);
      if(userEmailOrError.isFailure) {
        return Result.fail(new ArgumentInvalidException("invalid email value", undefined, {field: "email", value: field.email}));
        
      }
      userEmail = userEmailOrError.getValue();
    }

    if(field?.username) {
      const userNameOrError = UserName.create({"name": field.username});
      if(userNameOrError.isFailure) 
        return Result.fail(new ArgumentInvalidException("invalid username value", undefined, {field: "username", value: field.username}));
      userName = userNameOrError.getValue();
    }

    if(field?.password) {
      const userPasswordOrError = UserPassword.create({value: field.password});
      if(userPasswordOrError.isFailure) 
        return Result.fail(new ArgumentInvalidException("invalid password value", undefined, {field: "password", value: field.password}));
      userPassword = userPasswordOrError.getValue();
    }

    if(field?.role){
      if(field?.role !== Role.ADMIN && field?.role !== Role.USER){
        return Result.fail(new ArgumentInvalidException("invalid password value", undefined, {field: "password", value: field.password}));
      }
      userRole = field?.role;
    }

    return Result.ok({
      userEmail, userName, userPassword, userRole
    })
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
