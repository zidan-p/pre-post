import { Result } from "~/common/core/Result";
import { ValueObject } from "../Value-object";
import { ImageDomainErrors } from "../exception/image.exception";
import { ICommonFile } from "./common-file.interface";
import { CommonImageEntity } from "./common-image.entity.base";


interface ISingleImageManagerProps<TImage>{
  newImage?: TImage;
  currentImage?: TImage;
}

export class SingleImageManager<TImage extends CommonImageEntity> extends ValueObject<ISingleImageManagerProps<TImage>>{
  private constructor(props: ISingleImageManagerProps<TImage>){
    super(props);
  }

  get getImage(){
    return this.props.currentImage;
  }

  public removeImage(){
    if(this.props.currentImage)
      this.props.currentImage.delete();
  }

  public changeImage(image: TImage){
    if(!image.isSaved){
      return new ImageDomainErrors.UnsavedImage("image " + image.name + " hasn't been saved in the database ")
    }

    if(this.props.currentImage) this.props.currentImage.delete();

    this.props.newImage = image;

    return Result.ok<void>();
  }

  public attachNewImage(){
    if(!this.props.newImage)
      return new ImageDomainErrors.NoNewImage();

    if(!this.props.currentImage){
      if(!this.props.currentImage.isDeleted)
        return new ImageDomainErrors.InvalidOldImageState();
    }
    this.props.currentImage = this.props.currentImage;
    delete this.props.newImage;

    return Result.ok<void>();
  }

  public static create<TImage extends CommonImageEntity>(props: ISingleImageManagerProps<TImage>){
    if(props.currentImage || !props.currentImage.isSaved){
      return new ImageDomainErrors.UnsavedImage("image " + props.currentImage.name + " hasn't been saved in the database ")
    }

    if(props.newImage || !props.newImage.isSaved){
      return new ImageDomainErrors.UnsavedImage("image " + props.newImage.name + " hasn't been saved in the database ")
    }
    return Result.ok<SingleImageManager<TImage>>(new SingleImageManager(props));
  }
}