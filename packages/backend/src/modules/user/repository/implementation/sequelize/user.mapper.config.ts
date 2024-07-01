import { ObjectArrayableValue } from "~/common/types/object";
import { AdvaceObjectMapperConfig } from "~/common/utils/object";
import { UserPropsWithId } from "~/modules/user/domain/user.agreegate-root";

/** for single fiel option */
export const UserObjectMapperConfig: AdvaceObjectMapperConfig<UserPropsWithId> = {
  userId: { 
    outKey:"id",
    mapper: (userId) => userId.getStringValue()
  },
  email: { 
    outKey:"email",
    mapper: (email) => email.value
  },
  isDeleted: { outKey:"is_deleted"},
  password: { 
    outKey:"password",
    mapper: (pw) => pw.value
  },
  role: { 
    outKey:"role",
  },
  username: { 
    outKey:"username",
    mapper: (username) => username.value
  },
} as const;

/** for multiple field option */
export const UserObjectWhereInConfig: AdvaceObjectMapperConfig<ObjectArrayableValue<UserPropsWithId>> = {
  userId: { 
    outKey:"id",
    mapper: (userIds) => userIds.map(userId => userId.getStringValue())
  },
  email: { 
    outKey:"email",
    mapper: (emails) => emails.map(email => email.value)
  },
  isDeleted: { outKey:"is_deleted"},
  password: { 
    outKey:"password",
    mapper: (passwords) => passwords.map(pw => pw.value) 
  },
  role: { 
    outKey:"role",
  },
  username: { 
    outKey:"username",
    mapper: (usernames) => usernames.map(username => username.value)
  },
} as const