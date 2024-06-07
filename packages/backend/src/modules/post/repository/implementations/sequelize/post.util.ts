import { OrderByCofig } from "~/common/types/filter-query";
import { PostPropsWithId } from "~/modules/post/domain/post.agregate-root";
import { PostSequelize } from "./post.type";

export function ConvertToPostSequelizeOrderByConfig(arr: OrderByCofig<PostPropsWithId>): OrderByCofig<PostSequelize>{

  return arr.map(item => {

    let field: keyof PostSequelize;

    switch(item[0]){
      case "dateTimeCreated": 
        field = "date_time_created" 
        break;
      case "dateTimePosted":
        field = "date_time_posted";
        break;
      case "isPublised":
        field = "is_published";
        break;
      case "ownerId":
        field = "owner_id";
        break;
      case "postContent":
        field = "content";
        break;
      case "postId":
        field = "id";
        break;
      case "postImageManager":
        field = "image_id";
        break;
      case "postTitle":
        field = "title";
        break;
      default:
        console.error("invalid field [ " + item[0] + " ]" );
        throw new Error("invalid field [ " + item[0] + " ]" )
    }

    return [field, item[1]];
  })
}
