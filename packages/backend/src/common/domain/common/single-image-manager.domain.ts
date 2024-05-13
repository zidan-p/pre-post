import { Result } from "~/common/core/Result";
import { ValueObject } from "../Value-object";
import { SingleImageManagerDomainErrors } from "../exception/image.exception";
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

  /**
   * add new image value for current image replacement 
   * @param image 
   * @returns 
   */
  public changeImage(image: TImage){
    if(!image.isSaved){
      return new SingleImageManagerDomainErrors.UnsavedImage<SingleImageManager<TImage>>(
        "image " + image.name + " hasn't been saved in the database "
      )
    }

    if(this.props.currentImage) this.props.currentImage.delete();

    this.props.newImage = image;

    return Result.ok<void>();
  }

  /**
   * remove old image from domain and change it with the new image that attached.
   * #### Remember to use changeImage or provide the new image first in initialization 
   * @returns 
   */
  public attachNewImage(){
    if(!this.props.newImage)
      return new SingleImageManagerDomainErrors.NoNewImage<SingleImageManager<TImage>>();

    // when there are current image but it's not deleted, then throw the conflict.
    // it should be deleted in storage first;
    if(this.props.currentImage){
      if(!this.props.currentImage?.isDeleted)
      return new SingleImageManagerDomainErrors.InvalidOldImageState<SingleImageManager<TImage>>();
    }
    this.props.currentImage = this.props.currentImage;
    delete this.props.newImage;

    return Result.ok<void>();
  }

  public static create<TImage extends CommonImageEntity>(props: ISingleImageManagerProps<TImage>){
    if(props.currentImage){
      
      // have not been saved in database
      if(!(props.currentImage?.isSaved))
        return new SingleImageManagerDomainErrors.UnsavedImage<SingleImageManager<TImage>>(
          "image " + props.currentImage.name + " hasn't been saved in the database "
        )
    }

    if(props.newImage){
      if(!props.newImage.isSaved)
        return new SingleImageManagerDomainErrors.UnsavedImage<SingleImageManager<TImage>>(
          "image " + props.newImage.name + " hasn't been saved in the database "
        )
    }
    return Result.ok<SingleImageManager<TImage>>(new SingleImageManager(props));
  }
}