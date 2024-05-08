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


export interface ISequelizePostRaw {
  id?: string;
  title: string;
  content: string;
  image: ISequelizePostImageRaw | null;

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
      postImageManager: SingleImageManager.create<PostImage>({
        currentImage: this.postImageMap.toDomain(raw.image)
      }).getValue() ?? null as SingleImageManager<PostImage>,
      postTitle: PostTitle.create({value: raw.title}).getValue() ?? null
    }, new UniqueEntityID(raw?.id))

    if(postOrError.isFailure){
      console.error(postOrError.getErrorValue());
      return null;
    }
    
    return postOrError.getValue();
  } 


  public toPersistence(entity: Post): ISequelizePostRaw{

    return{
      title: entity.postTitle.value,
      content: entity.postContent.value,
      image: this.postImageMap.toPersistence(entity.imageManager.getImage),
      owner_id: entity.ownerId.getStringValue(),
      is_published: entity.isPublished,
      date_time_created: entity.dateTimeCreated,
      date_time_posted: entity.dateTimePosted
    }
  }
}