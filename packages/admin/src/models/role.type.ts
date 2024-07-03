export const AuthRole = {
  USER : "USER",
  ADMIN: "ADMIN"
} as const;

export const Role = {
  USER : "USER",
  ADMIN: "ADMIN",
  ANONYMOUS: "ANONYMOUS"
} as const;



export type AuthRoleValue = typeof AuthRole[keyof typeof AuthRole];
export type RoleValue = typeof Role[keyof typeof Role];