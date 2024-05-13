import { Mapper } from "~/common/core/Mapper";
import { Entity } from "~/common/domain/entity.base";
import { Post } from "../../domain/post.agregate-root";
import { ISequelizePostImageRaw, PostImageMap } from "./post-image.map";
import { UserId } from "../../domain/user-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { PostContent } from "../../domain/post-content.value-object";
import { SingleImageManager } from "~/common/domain/common/single-image-manager.domain";
import { PostImage } from "../../domain/post-image.entity";
import { PostTitle } from "../../domain/post-title.value-object";
import { ParseException } from "~/common/exceptions";


export interface ISequelizePostRaw {
  id?: string;
  title: string;
  content: string;
  image?: ISequelizePostImageRaw | null;

  /** hold new image value when you want to update it */
  // postImage?: PostImage;
  // newPostImage?: PostImage;
  owner_id: string;

  is_published: boolean;
  date_time_created: Date;
  date_time_posted?: Date; 
}


export type SequelizePostMapper = Mapper<Post, ISequelizePostRaw>;

export class PostMap implements SequelizePostMapper {

  private readonly postImageMap = new PostImageMap();

  public toDomain(raw: ISequelizePostRaw){
    
    const postOrError = Post.create({
      dateTimeCreated: raw.date_time_created,
      isPublised: raw.is_published,
      ownerId: UserId.create(new UniqueEntityID(raw.owner_id)).getValue() ?? null,
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
      throw new ParseException(["ISequelizePostRaw", "Post"], error);
    }
    
    return postOrError.getValue();
  } 


  public toPersistence(entity: Post): ISequelizePostRaw{

    const image = entity.imageManager.getImage;

    return{
      title: entity.postTitle.value,
      content: entity.postContent.value,
      image: image ? this.postImageMap.toPersistence(image) : null,
      owner_id: entity.ownerId.getStringValue(),
      is_published: entity.isPublished,
      date_time_created: entity.dateTimeCreated,
      date_time_posted: entity.dateTimePosted
    }
  }
}