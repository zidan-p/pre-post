import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { User } from "../../domain/user.agreegate-root";
import { PersisterMapper } from "~/common/core/mapper";
import { ParseException } from "~/common/exceptions";
import { RoleValue } from "~/common/core/role.const";









export interface ISequelizeUserRaw {
  id: string | number;
  email: string;
  username: string;
  // is_admin: boolean;
  role: RoleValue
}


export type SequelizeUserMapper = PersisterMapper<User, ISequelizeUserRaw>;

export class UserMap implements SequelizeUserMapper {
  public toDomain(raw: ISequelizeUserRaw): User {

    const userOrError = User.create({
      email: raw.email,
      username: raw.username,
      // isAdminUser: raw?.is_admin
      role: raw.role
    }, new UniqueEntityID(raw.id));

    if(userOrError.isFailure){
      const error = userOrError.getErrorValue();
      console.error(error);
      throw new ParseException(["ISequelizeUserRaw", "User"], error);
    }

    return userOrError.getValue();
  }


  public toPersistence (user: User): ISequelizeUserRaw {

    return {
      email: user.email,
      id: user.id.toString(),
      // is_admin: user.isAdminUser,
      role: user.role,
      username: user.username
    }
  }
}