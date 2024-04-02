import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { UserEmail } from "../domain/user-email.value-object";
import { UserName } from "../domain/user-name.value-object";
import { UserPassword } from "../domain/user-password.value-object";
import { User } from "../domain/user.agregate-root";




export interface IUserRaw {
  id: string | number;
  password: string;
  email: string;
  username: string;
  is_admin: boolean;
}





export class UserMap {
  public static toDomain(raw: IUserRaw): User {
    const usernameOrError = UserName.create({name: raw.username});
    const userPasswordOrError = UserPassword.create({ value: raw.password, hashed: true });
    const userEmailOrError = UserEmail.create(raw.email);

    const userOrError = User.create({
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
      username: usernameOrError.getValue(),
      isAdminUser: raw.is_admin,
    }, new UniqueEntityID(raw.id));

    if(userOrError.isFailure){
      console.log(userOrError.getErrorValue().message);
    }

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }


  public static async toPersistence (user: User): Promise<IUserRaw> {
    let password: string = null;
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }

    return {
      id: user.userId.getStringValue(),
      email: user.email.value,
      username: user.username.value,
      password: password,
      is_admin: user.isAdminUser
    }
  }
}