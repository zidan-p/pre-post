import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { UserEmail } from "../../domain/user-email.value-object";
import { UserName } from "../../domain/user-name.value-object";
import { UserPassword } from "../../domain/user-password.value-object";
import { User } from "../../domain/user.agregate-root";
import { ParseException } from "~/common/exceptions";
import { IPresenterMapper } from "~/common/core/mapper";
import { RoleValue } from "~/common/core/role.const";




export interface IUserRaw {
  id: string | number;
  password: string;
  email: string;
  username: string;
  role: RoleValue;
}

export interface IUserRawOutput {
  id: string | number;
  password?: string;
  email: string;
  username: string;
  role: RoleValue;
}

interface PresenterConfig {
  includePassword?: boolean;
}


export class UserMap implements IPresenterMapper<User, IUserRaw | Promise<IUserRaw | IUserRawOutput>>{


  async toPresentation(user: User, config?: PresenterConfig): Promise<IUserRawOutput>{
    

    let password: string | undefined;;
    if(config?.includePassword){
      if (!!user.password === true) {
        if (user.password.isAlreadyHashed()) {
          password = user.password.value;
        } else {
          password = await user.password.getHashedValue();
        }
      }
    }


    return {
      id: user.userId.getStringValue(),
      email: user.email.value,
      username: user.username.value,
      password: password ?? undefined,
      role: user.role
    }
  }


  toDomain(raw: IUserRaw): User {
    const usernameOrError = UserName.create({name: raw.username});
    const userPasswordOrError = UserPassword.create({ value: raw.password, hashed: true });
    const userEmailOrError = UserEmail.create(raw.email);

    const userOrError = User.create({
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
      username: usernameOrError.getValue(),
      role: raw.role
    }, new UniqueEntityID(raw.id));

    if(userOrError.isFailure){
      const error = userOrError.getErrorValue()
      console.error(error);
      throw new ParseException(["IUserRaw", "User"], error);
    }

    return userOrError.getValue();
  }

}