import { IPresenterMapper } from "~/common/core/mapper";
import { ExpressPostImageMap, IExpressPostImageRaw } from "./post-image.map";
import { Post } from "../../domain/post.agregate-root";
import { UserId } from "../../domain/user-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { PostContent } from "../../domain/post-content.value-object";
import { PostTitle } from "../../domain/post-title.value-object";
import { SingleImageManager } from "~/common/domain/common/single-image-manager.domain";
import { PostImage } from "../../domain/post-image.entity";
import { ArgumentInvalidException, ParseException } from "~/common/exceptions";


export interface IExpressPostRaw {
  id?: string;
  title: string;
  content: string;
  image: IExpressPostImageRaw | null;

  /** hold new image value when you want to update it */
  // postImage?: PostImage;
  // newPostImage?: PostImage;
  ownerId: string;

  isPublished: boolean;
  dateTimeCreated: Date;
  dateTimePosted?: Date | null; 
}


export interface ImagePresenterConfig{
  imageUrlGetter?: string,
  useImageUrlGetter: boolean
}

export type ExpressPostMapper = IPresenterMapper<Post, IExpressPostRaw>;

export class ExpressPostMap implements ExpressPostMapper {

  private readonly postImageMap = new ExpressPostImageMap();

  public toDomain(raw: IExpressPostRaw){

    // NOTE, the tranfrom from express raw to domain in the image field cannot be a string.
    // the string type is only for image getter for presenter.
    if(typeof raw.image === "string"){
      console.error("conversion from image type can be performed in image type");
      throw new ParseException("conversion from image type can be performed in image type");
    }
    
    const postOrError = Post.create({
      dateTimeCreated: raw.dateTimeCreated ?? null,
      isPublised: raw.isPublished,
      ownerId: UserId.create(new UniqueEntityID(raw.ownerId)).getValue() ?? null,
      postContent: PostContent.create({value: raw.content}).getValue() ?? null,
      postTitle: PostTitle.create({value: raw.title}).getValue() ?? null,
      postImageManager: SingleImageManager.create<PostImage>({
        currentImage: raw.image ?  this.postImageMap.toDomain(raw.image) : undefined
      })
        .getValue(),
    }, new UniqueEntityID(raw?.id))

    if(postOrError.isFailure){
      const error = postOrError.getErrorValue()
      console.error(error);
      throw new ParseException(["IExpressPostRaw", "Post"], error);
    }
    
    return postOrError.getValue();
  } 


  public toPresentation(entity: Post): IExpressPostRaw{

    return{
      title: entity.postTitle.value,
      content: entity.postContent.value,
      image: entity.postImage ? this.postImageMap.toPresentation(entity.postImage) : null,
      ownerId: entity.ownerId.getStringValue(),
      isPublished: entity.isPublished,
      dateTimeCreated: entity.dateTimeCreated,
      dateTimePosted: entity.dateTimePosted
    }
  }
}