import { IPresenterMapper } from "~/common/core/mapper";
import { ExpressPostImageMap, IExpressPostImageRaw } from "./post-image.map";
import { Post } from "../../domain/post.agregate-root";
import { UserId } from "../../domain/user-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { PostContent } from "../../domain/post-content.value-object";
import { PostTitle } from "../../domain/post-title.value-object";
import { SingleImageManager } from "~/common/domain/common/single-image-manager.domain";
import { PostImage } from "../../domain/post-image.entity";
import { ParseException } from "~/common/exceptions";


export interface IExpressPostWihtImageUrlRaw {
  id?: string;
  title: string;
  content: string;
  image:  null | string;

  /** hold new image value when you want to update it */
  // postImage?: PostImage;
  // newPostImage?: PostImage;
  ownerId: string;

  isPublished: boolean;
  dateTimeCreated: Date;
  dateTimePosted?: Date; 
}

export type ExpressWithImageUrlPostMapper = IPresenterMapper<Post, IExpressPostWihtImageUrlRaw>;

export class ExpressPostMapWithImageUrl implements ExpressWithImageUrlPostMapper {

  private readonly postImageMap = new ExpressPostImageMap();

  constructor(
    private readonly imageUrlGetter: URL
  ){}

  public toDomain(raw: IExpressPostWihtImageUrlRaw){

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
      throw new ParseException(["IExpressPostWihtImageUrlRaw", "Post"], error);
    }
    
    return postOrError.getValue();
  } 


  public toPresentation(entity: Post): IExpressPostWihtImageUrlRaw{

    let image: PostImage | string | undefined = entity.imageManager.getImage;
    let imagePresenter : string | undefined;

    if(image){
      imagePresenter = this.imageUrlGetter.pathname
      // imagePresenter = this.imageUrlGetter  + "/post/" + entity.id.toString() + "/banner";
    }


    

    return{
      title: entity.postTitle.value,
      content: entity.postContent.value,
      image: imagePresenter ?? null,
      ownerId: entity.ownerId.getStringValue(),
      isPublished: entity.isPublished,
      dateTimeCreated: entity.dateTimeCreated,
      dateTimePosted: entity.dateTimePosted
    }
  }
}