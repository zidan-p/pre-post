import { OrderByCofig } from "~/common/types/filter-query";
import { UserPropsWithId } from "~/modules/user/domain/user.agreegate-root";
import { UserSequelize } from "./user.type";

export function ConvertToUserSequelizeOrderByConfig(arr: OrderByCofig<UserPropsWithId>): OrderByCofig<UserSequelize>{

  return arr.map(item => {

    let field: keyof UserSequelize;

    switch(item[0]){
      case "email": field = "email"; break;
      case "password": field = "password"; break;
      case "role" : field = "role"; break;
      case "userId" : field = "id";break;
      case "username": field = "username"; break;
      default:
        console.error("invalid field [ " + item[0] + " ]" );
        throw new Error("invalid field [ " + item[0] + " ]" )
    }

    return [field, item[1]];
  })
}
