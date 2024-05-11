import { PresenterMapper } from "~/common/core/Mapper";
import { IPostMapperPresenterFactory } from "../post-mapper.factory.interface";
import { ExpressPostImageMap } from "./post-image.map";
import { ExpressUserMap } from "./user.map";
import { ExpressPostMap } from "./post.map";





export class ExpressMapperFactory implements IPostMapperPresenterFactory{
  createUserMapper(): PresenterMapper<any, any> {
    return new ExpressUserMap();
  }

  createPostMapper(): PresenterMapper<any, any> {
    return new ExpressPostMap("localhost:3000/post/");
  }

  createPostImageMapper(): PresenterMapper<any, any>{
    return new ExpressPostImageMap();
  }
  
}