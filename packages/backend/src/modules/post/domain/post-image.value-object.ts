import { Guard } from "~/common/core/Guard";
import { Result } from "~/common/core/Result";
import { ValueObject } from "~/common/domain/Value-object";
import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { Entity } from "~/common/domain/entity.base";
import { ArgumentInvalidException } from "~/common/exceptions";




// name: string;
// size: number; // in vytes
// fileType: string;

interface PostImageProps extends ICommonFile {
  imageType: "post-image"
}


export class PostImage extends ValueObject<PostImageProps>{

  private constructor (props: PostImageProps) {
    super(props);
  }

  get name(): string { return this.props.name }
  get size(): number { return this.props.size }
  get fileType(): string { return this.props.fileType }
  get imageType(): string { return this.props.imageType }

  private static validation(props: PostImageProps){
    if(props.imageType !== "post-image") 
      return Result.fail<PostImage>(new ArgumentInvalidException("the imageType should be post-image, [ " + props.imageType + " ] provided"));

    return Result.ok<void>();
  }

  public static create (props: PostImageProps){
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.fileType, argumentName: 'commentId' },
      { argument: props.imageType, argumentName: 'text' },
      { argument: props.fileType, argumentName: 'member' },
      { argument: props.size, argumentName: 'createdAt' },
    ]);

    if(nullGuard.isFailure) return nullGuard; // return the fail result

    const validation = this.validation(props);

    if(validation.isFailure) return validation;

    return Result.ok<PostImage>(new PostImage(props));
  }
}