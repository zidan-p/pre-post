import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { User } from "../../domain/user.agreegate-root";
import { PersisterMapper, IPresenterMapper } from "~/common/core/mapper";
import { ParseException } from "~/common/exceptions";
import { RoleValue } from "~/common/core/role.const";









export interface IExpressUserRaw {
  id: string | number;
  email: string;
  username: string;
  role: RoleValue;
  // isAdmin: boolean;
}


export type ExpressUserMapper = IPresenterMapper<User, IExpressUserRaw>;

export class ExpressUserMap implements ExpressUserMapper {
  public toDomain(raw: IExpressUserRaw): User {

    const userOrError = User.create({
      email: raw.email,
      username: raw.username,
      // isAdminUser: raw?.isAdmin
      role: raw.role
    }, new UniqueEntityID(raw.id));

    if(userOrError.isFailure){
      const error = userOrError.getErrorValue();
      console.error(userOrError.getErrorValue());
      throw new ParseException(["IExpressUserRaw", "User"], error);
    }

    return userOrError.getValue();
  }


  public toPresentation(user: User): IExpressUserRaw {

    return {
      email: user.email,
      id: user.id.toString(),
      // isAdmin: user.isAdminUser,
      role: user.role,
      username: user.username
    }
  }
}