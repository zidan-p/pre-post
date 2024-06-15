import { IUserAuth } from "~/common/core/user.auth.interface";

export interface PublishManyOwnedPostsFiles{}

export interface PublishManyOwnedPostsBody{}

export interface PublishManyOwnedPostsParams{}

export interface PublishManyOwnedPostsQuery{
  postIds: string[]
}

export interface PublishManyOwnedPostsDTORequest {
  query: PublishManyOwnedPostsQuery;
  user: IUserAuth;
}

export interface PublishManyOwnedPostsDTOResponse{}