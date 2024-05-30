import { Either, Result } from "~/common/core/result";
import { AppError } from "~/common/core/app.error";
import { UpdateManyPostDTOResponse } from "./update-many-post.dto";
import { UpdateManyPostUseCaseErrors } from "./update-many-post.error";
import { PostId } from "~/modules/post/domain/post-id.value-object";
import { PostImage } from "~/modules/post/domain/post-image.entity";
import { PostTitle } from "~/modules/post/domain/post-title.value-object";

export type UpdateManyPostResponse = Either<
  UpdateManyPostUseCaseErrors.SomePostNotFound | 
  UpdateManyPostUseCaseErrors.IssueWhenBuilding | 
  UpdateManyPostUseCaseErrors.InvalidImageProperties | 
  UpdateManyPostUseCaseErrors.InvalidProperties | 
  AppError.UnexpectedError,
  Result<UpdateManyPostDTOResponse> 
  // | Result<any>
>

export type UpdateManyPostValidateCollectionId = Either <
  UpdateManyPostUseCaseErrors.SomePostNotFound | 
  UpdateManyPostUseCaseErrors.IssueWhenBuilding,
  Result<PostId[]>
>


export type ValidatePostImageResponse = Either <
  UpdateManyPostUseCaseErrors.InvalidImageProperties ,
  Result<PostImage>
>


export type ValidatePostTitleResponse = Either<
  UpdateManyPostUseCaseErrors.InvalidProperties ,
  Result<PostTitle>
>

export type ValidatePostContentResponse = Either<
  UpdateManyPostUseCaseErrors.InvalidProperties ,
  Result<PostTitle>
>

