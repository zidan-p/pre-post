import { Mapper, PresenterMapper } from "~/common/core/Mapper";
import { PostImage } from "../../domain/post-image.entity";
import { ArgumentNotProvidedException, ParseException } from "~/common/exceptions";



export interface IExpressPostImageRaw {
  name: string;
  size: number; // in vytes
  fileType: string; // mime type
  group: string; // usefull for storage direction
  imageType: string;
}

export type SequelizePostImageMapper = PresenterMapper<PostImage, IExpressPostImageRaw>;

export class ExpressPostImageMap implements PresenterMapper<PostImage, IExpressPostImageRaw>{


  // or just return the url to image
  toPresentation(entity: PostImage): IExpressPostImageRaw{
    if(!entity) {
      throw new ArgumentNotProvidedException("Argument entity not provided when parsing to persistance")
    };
    
    return {
      name: entity.name,
      size: entity.size,
      fileType: entity.fileType,
      group: entity.group,
      imageType: entity.imageType
    }
  };

  public toDomain(raw: IExpressPostImageRaw){
    const postImageOrError = PostImage.create({
      size: raw.size,
      fileType: raw.fileType,
      group: raw.group as "post/image",
      imageType: raw.imageType as "post-image",
      name: raw.name
    });

    if(postImageOrError.isFailure){
      console.error(postImageOrError.getErrorValue());
      throw new ParseException(["IExpressPostImageRaw", "PostImage"], postImageOrError.getErrorValue())
    }

    return postImageOrError.getValue();
  };
}