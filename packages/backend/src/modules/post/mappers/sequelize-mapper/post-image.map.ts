import { Mapper } from "~/common/core/Mapper";
import { PostImage } from "../../domain/post-image.entity";



export interface IPostImageRaw {
  name: string;
  size: number; // in vytes
  file_type: string; // mime type
  group: string; // usefull for storage direction
  image_type: string;

}

export type SequelizePostImageMapper = Mapper<PostImage, IPostImageRaw>;

export class PostImageMap implements Mapper<PostImage, IPostImageRaw>{

  public toDomain(raw: IPostImageRaw){
    const postImageOrError = PostImage.create({
      size: raw.size,
      fileType: raw.file_type,
      group: raw.group as "post/image",
      imageType: raw.image_type as "post-image",
      name: raw.name
    });

    if(postImageOrError.isFailure){
      console.error(postImageOrError.getErrorValue());
      return null;
    }

    return postImageOrError.getValue();
  };


  public toPersistance(entity: PostImage): IPostImageRaw | null{
    if(!entity) return null;
    
    return {
      name: entity.name,
      size: entity.size,
      file_type: entity.fileType,
      group: entity.group,
      image_type: entity.imageType
    }
  };
}