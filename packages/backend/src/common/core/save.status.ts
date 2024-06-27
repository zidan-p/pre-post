




export const SaveStatus = {
  CREATE : "CREATED",
  DELETED : "DELETED",
  UPDATED : "UPDATED"
} as const


export type SaveStatusValue = typeof SaveStatus[keyof typeof SaveStatus]