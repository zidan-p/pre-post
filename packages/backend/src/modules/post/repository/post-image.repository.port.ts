import { SaveStatus } from "~/common/types/repository";
import { PostImage } from "../domain/post-image.entity";





export interface IPostImageRepo{
  save(payload: PostImage): Promise<SaveStatus>;
  isAlreadySaved(postImage: PostImage): Promise<boolean>;

}