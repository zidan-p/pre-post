
export interface DeleteManyUserFiles{}

export interface DeleteManyUserBody{}

export interface DeleteManyUserParams{}

export interface DeleteManyUserQuery{
  userIds: string[];
}

export interface DeleteManyUserDTORequest {
  query?: Partial<DeleteManyUserQuery>;
}

export interface DeleteManyUserDTOResponse{
  userIds: string[];
}

export type DeleteManyUserDTOEnd = {
  userIds: string[];
}