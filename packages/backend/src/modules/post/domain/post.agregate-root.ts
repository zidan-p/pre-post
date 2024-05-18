import { AggregateRoot } from "~/common/domain/agregate-root.base";
import { PostContent } from "./post-content.value-object";
import { PostImage } from "./post-image.entity";
import { PostTitle } from "./post-title.value-object";
import { UserId } from "./user-id.value-object";
import { PostId } from "./post-id.value-object";
import { Result } from "~/common/core/result";
import { PostDomainErrors } from "./exceptions/post.exception";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { Guard } from "~/common/core/guard";
import { SingleImageManager } from "~/common/domain/common/single-image-manager.domain";



export interface PostProps{
  postTitle: PostTitle;
  postContent: PostContent;
  postImageManager: SingleImageManager<PostImage>;

  /** hold new image value when you want to update it */
  // postImage?: PostImage;
  // newPostImage?: PostImage;
  ownerId: UserId;

  isPublised: boolean;
  dateTimeCreated: Date;
  dateTimePosted?: Date; // when user or admin publish it's own post
}

export class Post extends AggregateRoot<PostProps>{

  private constructor (props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get postId(): PostId{ return PostId.create(this._id).getValue() }
  get postTitle(): PostTitle {return this.props.postTitle}
  get postContent(): PostContent {return this.props.postContent}
  get postImage(): PostImage | undefined {return this.props.postImageManager.getImage}
  get imageManager(): SingleImageManager<PostImage> { return this.props.postImageManager }
  get ownerId(): UserId {return this.props.ownerId}
  get isPublished(): boolean { return this.props.isPublised }
  get dateTimeCreated(): Date { return this.props.dateTimeCreated }
  get dateTimePosted(): undefined | Date { return this.props.dateTimePosted }

  public set postContent(content: PostContent){
    this.props.postContent = content;
  }

  public set postTitle(title: PostTitle){
    this.props.postTitle = title;
  }

  public publishPost(){

    this.props.isPublised = true;
    this.props.dateTimePosted = new Date();
    return Result.ok<void>();
  }

  public unPublishPost(){

    this.props.isPublised = false;
    this.props.dateTimePosted = undefined;
    return Result.ok<void>();
  }


  public updateTitle(title: PostTitle){
    this.props.postTitle = title;
    return Result.ok<void>();
  }

  public updateContent(newContent: PostContent){
    this.props.postContent = newContent;
    return Result.ok<void>();
  }

  public static validation(payload: PostProps){
    // do validation later
    return Result.ok<void>();
  }

  public static create(payload: PostProps, id?: UniqueEntityID){
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      {argument: payload.dateTimeCreated, argumentName: "dateTime"},
      {argument: payload.isPublised, argumentName: "isPublised"},
      {argument: payload.ownerId, argumentName: "ownerId"},
      {argument: payload.postContent, argumentName: "postContent"},
      {argument: payload.postTitle, argumentName: "postTitle"},
      {argument: payload.postImageManager, argumentName: "postImageManager"}
    ]);

    if(nullGuard.isFailure) return Result.fail<Post>(nullGuard.getErrorValue());
    const validation = this.validation(payload);
    if(validation.isFailure) return Result.fail<Post>(validation.getErrorValue());

    const isNewInstance = !!id === false;

    if(isNewInstance)
      return Result.ok<Post>(new Post(payload));

    return Result.ok<Post>(new Post(payload, id));

  }

  
}








