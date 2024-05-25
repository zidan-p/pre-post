import { IUserAuth } from "~/common/core/user.auth.interface";

export interface UnpublishManyOwnedPostsFiles{}

export interface UnpublishManyOwnedPostsBody{
  postIds: string[]
}

export interface UnpublishManyOwnedPostsParams{}

export interface UnpublishManyOwnedPostsQuery{}

export interface UnpublishManyOwnedPostsDTORequest {
  body: UnpublishManyOwnedPostsBody;
  user: IUserAuth;
}

export interface UnpublishManyOwnedPostsDTOResponse{}