import { PostId } from "../domain/post-id.value-object";
import { Post } from "../domain/post.agregate-root";




type Updated = 0;
type Created = 1;
export type saveStatus = Created | Updated; 


export interface IPostRepo{
  exists(postId: string): Promise<boolean>;
  findById(postId: string | PostId): Promise<Post | null>;
  save (user: Post): Promise<saveStatus>;
}