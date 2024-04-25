import { Guard } from "~/common/core/Guard";
import { Result } from "~/common/core/Result";
import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { Entity } from "~/common/domain/entity.base";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { ArgumentInvalidException } from "~/common/exceptions";




// name: string;
// size: number; // in bytes
// fileType: string;

export interface PostImageProps extends ICommonFile {
  imageType: "post-image";
  group: "post/image"

  isDeleted?: boolean;
  isSaved?: boolean; // is already saved in database
}


export class PostImage extends Entity<PostImageProps>{

  private constructor (props: PostImageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id (): UniqueEntityID {
    return this._id;
  }

  get name(): string { return this.props.name }
  get size(): number { return this.props.size }
  get fileType(): string { return this.props.fileType }
  get imageType(): string { return this.props.imageType }
  get isDeleted() { return this.props.isDeleted }
  get isSaved() { return this.props.size }

  public delete(){
    if(!this.props.isDeleted) this.props.isDeleted = true;
  }

  private static validation(props: PostImageProps){
    if(props.imageType !== "post-image") 
      return Result.fail<PostImage, ArgumentInvalidException>(
        new ArgumentInvalidException('the imageType should be "post-image", [ ' + props.imageType + " ] provided")
      );

    return Result.ok<PostImage>();
  }

  public static create (props: PostImageProps, id?: UniqueEntityID){
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.fileType, argumentName: 'commentId' },
      { argument: props.imageType, argumentName: 'text' },
      { argument: props.fileType, argumentName: 'member' },
      { argument: props.size, argumentName: 'createdAt' },
    ]);

    if(nullGuard.isFailure) return nullGuard as unknown as Result<PostImage>; // return the fail result

    const validation = this.validation(props);

    if(validation.isFailure) return validation;

    const isNewInstance = !!id === false;

    if(isNewInstance)
      return Result.ok<PostImage>(new PostImage({
        isDeleted: false,
        isSaved: false,
        ...props
      }));
    
    return Result.ok<PostImage>(new PostImage({
      isDeleted: false,
      isSaved: true,
      ...props
    }, id));
  }
}