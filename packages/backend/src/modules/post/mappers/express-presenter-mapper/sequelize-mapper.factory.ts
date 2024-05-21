import { IPresenterMapper } from "~/common/core/mapper";
import { IPostMapperPresenterFactory } from "../post-mapper.factory.interface";
import { ExpressPostImageMap } from "./post-image.map";
import { ExpressUserMap } from "./user.map";
import { ExpressPostMap } from "./post.map";
import { ExpressPostMapWithImageUrl } from "./post-with-image-url.map";




export class ExpressMapperFactory implements IPostMapperPresenterFactory{
  createUserMapper(): IPresenterMapper<any, any> {
    return new ExpressUserMap();
  }

  createPostMapper(): IPresenterMapper<any, any> {
    return new ExpressPostMap();
  }

  createPostImageMapper(): IPresenterMapper<any, any>{
    return new ExpressPostImageMap();
  }
  
}



export class ExpressMapperFactoryWithResourceUrlSerializer implements IPostMapperPresenterFactory{

  constructor(private readonly url: URL){}

  createPostMapper(): IPresenterMapper<any, any> {
    return new ExpressPostMapWithImageUrl(this.url);
    
  }
  createPostImageMapper(): IPresenterMapper<any, any> {
    return new ExpressPostImageMap();
  }
  createUserMapper(): IPresenterMapper<any, any> {
    return new ExpressUserMap();
  }
  
}