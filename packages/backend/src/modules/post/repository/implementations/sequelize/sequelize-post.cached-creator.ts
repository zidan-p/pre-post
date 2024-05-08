import { SequelizePostImageMapper } from "~/modules/post/mappers/sequelize-mapper/post-image.map";
import { IPostCreator } from "../../post-creator.interface";
import { IPostImageRepo } from "../../post-image.repository.port";
import { IPostRepo } from "../../post.repository.port";
import { IUserRepo } from "../../user.repository.port";
import { SequelizePostImageRepository } from "./post-image.repository-impl";
import { SequelizePostRepository } from "./post.repository-impl";
import { SequelizeUserRepository } from "./user.repository-impl";
import { SequelizePostMapper } from "~/modules/post/mappers/sequelize-mapper/post.map";
import { SequelizeUserMapper } from "~/modules/post/mappers/sequelize-mapper/user.map";





export class SequelizePostCachedCreator implements IPostCreator{

  private imagePostRepo: SequelizePostImageRepository;
  private postRepo: SequelizePostRepository;
  private userRepo: SequelizeUserRepository;

  constructor(
    private readonly 
    private readonly imagePostMapper: SequelizePostImageMapper,
    private readonly postMapper: SequelizePostMapper,
    private readonly userMapper: SequelizeUserMapper
  ){
    this.ima
  }

  createPostImageRepo: () => IPostImageRepo;
  createPostRepo: () => IPostRepo;
  createUserRepo: () => IUserRepo;
  
}