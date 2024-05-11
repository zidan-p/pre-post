type Updated = 0;
type Created = 1;
export type SaveStatus = Created | Updated; 



export const SaveStatusConst = {
  UPDATED : 0,
  CREATED : 1
} as const;