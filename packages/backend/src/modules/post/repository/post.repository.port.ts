import { Post } from "../domain/post.agregate-root";




type Updated = 0;
type Created = 1;
export type saveStatus = Created | Updated; 


export interface IPostRepo{
  exists(postId: string): Promise<boolean>;
  save (user: Post): Promise<saveStatus>;
}