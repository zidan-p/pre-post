import { Mapper } from "~/common/core/Mapper";
import { Entity } from "~/common/domain/entity.base";
import { Post } from "../../domain/post.agregate-root";
import { IPostImageRaw, PostImageMap } from "./post-image.map";
import { UserId } from "../../domain/user-id.value-object";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { PostContent } from "../../domain/post-content.value-object";
import { SingleImageManager } from "~/common/domain/common/single-image-manager.domain";
import { PostImage } from "../../domain/post-image.entity";
import { PostTitle } from "../../domain/post-title.value-object";


interface IPostRaw {
  title: string;
  content: string;
  image: IPostImageRaw | null;

  /** hold new image value when you want to update it */
  // postImage?: PostImage;
  // newPostImage?: PostImage;
  owner_id: string;

  is_published: boolean;
  date_time_created: Date;
  date_time_posted?: Date; 
}


export class postMap implements Mapper<Post, IPostRaw> {

  private readonly postImageMap = new PostImageMap();

  public toDomain(raw: IPostRaw){
    
    const postOrError = Post.create({
      dateTimeCreated: raw.date_time_created,
      isPublised: raw.is_published,
      ownerId: UserId.create(new UniqueEntityID(raw.owner_id)).getValue() ?? null,
      postContent: PostContent.create({value: raw.content}).getValue() ?? null,
      postImageManager: SingleImageManager.create<PostImage>({
        currentImage: this.postImageMap.toDomain(raw.image)
      }).getValue() ?? null as SingleImageManager<PostImage>,
      postTitle: PostTitle.create({value: raw.title}).getValue() ?? null
    })

    if(postOrError.isFailure){
      console.error(postOrError.getErrorValue());
      return null;
    }
    
    return postOrError.getValue();
  } 


  public toPersistance(entity: Post): IPostRaw{

    return{
      title: entity.postTitle.value,
      content: entity.postContent.value,
      image: this.postImageMap.toPersistance(entity.imageManager.getImage),
      owner_id: entity.ownerId.getStringValue(),
      is_published: entity.isPublished,
      date_time_created: entity.dateTimeCreated,
      date_time_posted: entity.dateTimePosted
    }
  }
}