import { ValueObject } from "~/common/domain/Value-object";
import { CommonImage } from "./image.interface";
import { PostImage } from "./post-image.entity";
import { Result } from "~/common/core/Result";
import { PostDomainErrors } from "./exceptions/post.exception";
import { AppError } from "~/common/core/AppError";




interface ImageManagerProps {
  newImage?: PostImage;
  currentImage?: PostImage;
}


export class PostImageManager extends ValueObject<ImageManagerProps>{

  private constructor(props: ImageManagerProps){
    super(props);
  }

  get getImage(){
    return this.props.currentImage;
  }

  public removeImage(){
    if(this.props.currentImage)
      this.props.currentImage.delete();
  }

  public changeImage(image: PostImage){
    if(!image.isSaved){
      return new PostDomainErrors.ImageNotSavedInDatabase("image " + image.name + " hasn't been saved in the database ")
    }

    if(this.props.currentImage) this.props.currentImage.delete();

    this.props.newImage = image;

    return Result.ok<void>();
  }

  public attachNewImage(){
    if(!this.props.newImage)
      return new PostDomainErrors.NoNewImage();

    if(!this.props.currentImage){
      if(!this.props.currentImage.isDeleted)
        return new PostDomainErrors.InvalidOldImageState();
    }
    this.props.currentImage = this.props.currentImage;
    delete this.props.newImage;

    return Result.ok<void>();
  }

  public static create(props: ImageManagerProps){
    if(props.currentImage || !props.currentImage.isSaved){
      return new PostDomainErrors.ImageNotSavedInDatabase("image " + props.currentImage.name + " hasn't been saved in the database ")
    }

    if(props.newImage || !props.newImage.isSaved){
      return new PostDomainErrors.ImageNotSavedInDatabase("image " + props.newImage.name + " hasn't been saved in the database ")
    }
    return Result.ok<PostImageManager>(new PostImageManager(props));
  }
}