import { AggregateRoot } from "~/common/domain/agregate-root.base";
import { PostContent } from "./post-content.value-object";
import { PostImage } from "./post-image.value-object";
import { PostTitle } from "./post-title.value-object";
import { UserId } from "./user-id.value-object";
import { PostId } from "./post-id.value-object";



interface PostProps{
  postTitle: PostTitle;
  postContent: PostContent;
  postImage: PostImage;
  ownerId: UserId;
}

export class Post extends AggregateRoot<PostProps>{

  get postId(): PostId{ return PostId.create(this._id).getValue() }
  get postTitle(): PostTitle {return this.props.postTitle}
  get postContent(): PostContent {return this.props.postContent}
  get postImage(): PostImage {return this.props.postImage}
  get ownerId(): UserId {return this.props.ownerId}


  
}








