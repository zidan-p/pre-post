import { FilterQuery } from "~/common/types/filter-query";
import { IPaginate } from "~/common/types/paginate";
import { User, UserProps } from "~/modules/user/domain/user.agreegate-root";

export interface GetListUserFiles{}

export interface GetListUserBody{}

export interface GetListUserParams{}

export interface GetListUserQuery extends Partial<FilterQuery<UserProps>>{}

export interface GetListUserDTORequest {
  query?: GetListUserQuery;
}

export interface GetListUserDTOResponse{
  users: User[];
  paginate: IPaginate
}

export type GetListUserDTOEnd<TUser = any, TPaginate = any> = {
  users: TUser;
  paginate: TPaginate;
}  