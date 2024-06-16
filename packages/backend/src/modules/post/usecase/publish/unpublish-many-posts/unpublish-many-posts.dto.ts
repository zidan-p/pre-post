import { PostId } from "~/modules/post/domain/post-id.value-object"

export interface UnpublishManyPostsFiles{}

export interface UnpublishManyPostsBody{
  postIds: string[]
}

export interface UnpublishManyPostsParams{}

export interface UnpublishManyPostsQuery{
  postIds: string[]
}

export interface UnpublishManyPostsDTORequest {
  query: UnpublishManyPostsQuery
}

export interface UnpublishManyPostsDTOResponse{
  postIds: PostId[];
}