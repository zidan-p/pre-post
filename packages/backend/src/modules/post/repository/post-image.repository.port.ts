import { SaveStatus } from "~/common/types/repository";
import { PostImage } from "../domain/post-image.entity";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";





export interface IPostImageRepo{
  save(payload: PostImage): Promise<SaveStatus>;
  isAlreadySaved(postImage: PostImage): Promise<boolean>;
  remove(postImageId: string | UniqueEntityID): Promise<void>;
}