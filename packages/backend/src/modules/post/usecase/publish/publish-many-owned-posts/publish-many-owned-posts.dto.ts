import { IUserAuth } from "~/common/core/user.auth.interface";

export interface PublishManyOwnedPostsFiles{}

export interface PublishManyOwnedPostsBody{
  postIds: string[]
}

export interface PublishManyOwnedPostsParams{}

export interface PublishManyOwnedPostsQuery{}

export interface PublishManyOwnedPostsDTORequest {
  body: PublishManyOwnedPostsBody;
  user: IUserAuth;
}

export interface PublishManyOwnedPostsDTOResponse{}