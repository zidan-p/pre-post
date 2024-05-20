export const Role = {
  USER : "USER",
  ADMIN: "ADMIN"
} as const;


export type RoleValue = typeof Role[keyof typeof Role];