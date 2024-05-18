import { PersisterMapper } from "~/common/core/mapper";
import { Entity } from "~/common/domain/entity.base";
import { IPostMapperFactory } from "../post-mapper.factory.interface";
import { ISequelizePostRaw, PostMap } from "./post.map";
import { Post } from "../../domain/post.agregate-root";
import { PostImageMap } from "./post-image.map";
import { UserMap } from "./user.map";




export class SequelizeMapperFactory implements IPostMapperFactory{
  createUserMapper(): PersisterMapper<any, any> {
    return new UserMap();
  }

  createPostMapper(): PersisterMapper<any, any> {
    return new PostMap();
  }

  createPostImageMapper(): PersisterMapper<any, any>{
    return new PostImageMap
  }
  
}