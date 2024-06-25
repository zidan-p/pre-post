import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateManyOwnedPostDTOResponse } from "./update-many-owned-post.dto";
import { UpdateManyOwnedPostUseCaseErrors } from "./update-many-owned-post.error";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { PostImage } from "~/modules/post/domain/post-image.entity";
import { PostTitle } from "~/modules/post/domain/post-title.value-object";
import { PostContent } from "~/modules/post/domain/post-content.value-object";

export type UpdateManyOwnedPostResponse = Either<
  UpdateManyOwnedPostUseCaseErrors.FailBuildingPost|
  UpdateManyOwnedPostUseCaseErrors.UnauthorizeUser |
  UpdateManyOwnedPostUseCaseErrors.ForbiddenUser |
  UpdateManyOwnedPostUseCaseErrors.InvalidImageManagerProps |
  UpdateManyOwnedPostUseCaseErrors.InvalidImageProperties |
  UpdateManyOwnedPostUseCaseErrors.InvalidProperties |
  UpdateManyOwnedPostUseCaseErrors.PostNotFound |
  AppError.UnexpectedError,
  Result<UpdateManyOwnedPostDTOResponse>
>;

export type UpdateManyPostValidateCollectionId = Either <
  UpdateManyOwnedPostUseCaseErrors.SomePostNotFound | 
  UpdateManyOwnedPostUseCaseErrors.IssueWhenBuilding,
  Result<PostId[]>
>


export type ValidatePostImageResponse = Either <
  UpdateManyOwnedPostUseCaseErrors.InvalidImageProperties ,
  Result<PostImage>
>


export type ValidatePostTitleResponse = Either<
  UpdateManyOwnedPostUseCaseErrors.InvalidProperties ,
  Result<PostTitle>
>

export type ValidatePostContentResponse = Either<
  UpdateManyOwnedPostUseCaseErrors.InvalidProperties ,
  Result<PostContent>
>

