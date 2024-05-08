import { IPostImageRepo } from "./post-image.repository.port";
import { IPostRepo } from "./post.repository.port";
import { IUserRepo } from "./user.repository.port";







export interface IPostFactory{


  createPostImageRepo: () => IPostImageRepo;
  createPostRepo: () => IPostRepo;
  createUserRepo: () => IUserRepo;
}