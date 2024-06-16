import { IUserAuth } from "~/common/core/user.auth.interface";
import { PostId } from "~/modules/post/domain/post-id.value-object";

export interface UnpublishManyOwnedPostsFiles{}

export interface UnpublishManyOwnedPostsBody{}

export interface UnpublishManyOwnedPostsParams{}

export interface UnpublishManyOwnedPostsQuery{
  postIds: string[]
}

export interface UnpublishManyOwnedPostsDTORequest {
  query: UnpublishManyOwnedPostsQuery;
  user: IUserAuth;
}

export interface UnpublishManyOwnedPostsDTOResponse{
  postIds: PostId[];
}