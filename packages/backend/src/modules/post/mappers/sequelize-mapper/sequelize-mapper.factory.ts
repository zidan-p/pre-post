import { Mapper } from "~/common/core/Mapper";
import { Entity } from "~/common/domain/entity.base";
import { IPostMapperFactory } from "../post-mapper.factory.interface";
import { ISequelizePostRaw, PostMap } from "./post.map";
import { Post } from "../../domain/post.agregate-root";
import { PostImageMap } from "./post-image.map";
import { UserMap } from "./user.map";




export class SequelizeMapperFactory implements IPostMapperFactory{
  createUserMapper(): Mapper<any, any> {
    return new UserMap();
  }

  createPostMapper(): Mapper<any, any> {
    return new PostMap();
  }

  createPostImageMapper(): Mapper<any, any>{
    return new PostImageMap
  }
  
}