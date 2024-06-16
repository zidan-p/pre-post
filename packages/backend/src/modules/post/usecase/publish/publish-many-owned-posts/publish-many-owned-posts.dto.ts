import { IUserAuth } from "~/common/core/user.auth.interface";
import { PostId } from "~/modules/post/domain/post-id.value-object";

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

export interface PublishManyOwnedPostsDTOResponse{
  postIds: PostId[];
}