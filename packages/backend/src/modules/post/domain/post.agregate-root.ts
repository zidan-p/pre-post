import { AggregateRoot } from "~/common/domain/agregate-root.base";
import { PostContent } from "./post-content.value-object";
import { PostImage } from "./post-image.entity";
import { PostTitle } from "./post-title.value-object";
import { UserId } from "./user-id.value-object";
import { PostId } from "./post-id.value-object";
import { Result } from "~/common/core/Result";
import { PostDomainErrors } from "./exceptions/post.exception";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { Guard } from "~/common/core/Guard";



interface PostProps{
  postTitle: PostTitle;
  postContent: PostContent;
  postImage?: PostImage;

  /** hold new image value when you want to update it */
  newPostImage?: PostImage;
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
  get postImage(): PostImage {return this.props.postImage}
  get ownerId(): UserId {return this.props.ownerId}
  get isPublished(): boolean { return this.props.isPublised }
  get dateTimeCreated(): Date { return this.props.dateTimeCreated }
  get dateTimePosted(): undefined | Date { return this.props.dateTimePosted }

  public publishPost(){

    this.props.isPublised = true;
    this.props.dateTimePosted = new Date();
    return Result.ok<void>();
  }

  public unPublishPost(){

    this.props.isPublised = false;
    this.props.dateTimePosted = null;
    return Result.ok<void>();
  }

  
  public removeImage(){
    if(this.props.postImage)
      this.props.postImage.delete();
  }

  public changeImage(image: PostImage){
    if(!image.isSaved){
      return new PostDomainErrors.ImageNotSavedInDatabase("image " + image.name + " hasn't been saved in the database ")
    }

    if(this.postImage) this.postImage.delete();

    this.props.newPostImage = image;

    return Result.ok<void>();
  }

  public attachNewImage(){
    if(!this.props.newPostImage)
      return new PostDomainErrors.NoNewImage();

    if(!this.props.postImage){
      if(!this.props.postImage.isDeleted)
        return new PostDomainErrors.InvalidOldImageState();
    }
    this.props.postImage = this.props.postImage;
    delete this.props.newPostImage;

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
    ]);

    if(nullGuard.isFailure) return nullGuard;
    const validation = this.validation(payload);
    if(validation.isFailure) return validation;

    const isNewInstance = !!id === false;

    if(isNewInstance)
      return Result.ok<Post>(new Post(payload));

    return Result.ok<Post>(new Post(payload, id));

  }

  
}








