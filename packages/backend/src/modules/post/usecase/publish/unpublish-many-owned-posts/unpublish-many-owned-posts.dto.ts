import { IUserAuth } from "~/common/core/user.auth.interface";

export interface UnpublishManyOwnedPostsFiles{}

export interface UnpublishManyOwnedPostsBody{
  postIds: string[]
}

export interface UnpublishManyOwnedPostsParams{}

export interface UnpublishManyOwnedPostsQuery{
  postIds: string[]
}

export interface UnpublishManyOwnedPostsDTORequest {
  query: UnpublishManyOwnedPostsQuery;
  user: IUserAuth;
}

export interface UnpublishManyOwnedPostsDTOResponse{}