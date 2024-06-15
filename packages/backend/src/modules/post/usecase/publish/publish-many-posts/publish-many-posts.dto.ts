import { PostId } from "~/modules/post/domain/post-id.value-object";

export interface PublishManyPostsFiles{}

export interface PublishManyPostsBody{}

export interface PublishManyPostsParams{}

export interface PublishManyPostsQuery{
  postIds?: string[]
}

export interface PublishManyPostsDTORequest {
  query?: PublishManyPostsQuery;
}

export interface PublishManyPostsDTOResponse{
  postIds: PostId[];
}