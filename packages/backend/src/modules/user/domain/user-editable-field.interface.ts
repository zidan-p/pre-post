import { RoleValue } from "~/common/core/role.const"
import { UserEmail } from "./user-email.value-object";
import { UserName } from "./user-name.value-object";
import { UserPassword } from "./user-password.value-object";



export interface UserEditableField {
  email: string,
  username: string,
  password: string,
  role: RoleValue,
}

export interface UserEditableFieldValueObject {
  userEmail: UserEmail,
  userName: UserName,
  userPassword: UserPassword,
  userRole: RoleValue,
}