import { PostImageProps } from "~/modules/post/domain/post-image.entity";
import { Entity } from "../entity.base";
import { ICommonFile } from "./common-file.interface";
import { UniqueEntityID } from "../unique-entitiy";
import { Result } from "~/common/core/result";




export interface ICommonImageProps extends ICommonFile {
  imageType: string;
  group: string;

  isDeleted?: boolean;
  isSaved?: boolean;
}




export abstract class CommonImageEntity<TImageProps extends ICommonImageProps = ICommonImageProps> 
  extends Entity<TImageProps>
{
  private constructor (props: TImageProps, id?: UniqueEntityID) {
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
}