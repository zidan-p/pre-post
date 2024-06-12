import { PersisterMapper } from "~/common/core/mapper";
import { PostImage } from "../../domain/post-image.entity";
import { ArgumentNotProvidedException, ParseException } from "~/common/exceptions";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";



export interface ISequelizePostImageRaw {
  id?: string;
  name: string;
  size: number; // in vytes
  file_type: string; // mime type
  group: string; // usefull for storage direction
  image_type: string;

}

export type SequelizePostImageMapper = PersisterMapper<PostImage, ISequelizePostImageRaw>;

export class PostImageMap implements PersisterMapper<PostImage, ISequelizePostImageRaw>{

  public toDomain(raw: ISequelizePostImageRaw){
    const postImageOrError = PostImage.create({
      size: raw.size,
      fileType: raw.file_type,
      group: raw.group as "postImage",
      imageType: raw.image_type as "post",
      name: raw.name
    }, new UniqueEntityID(raw?.id));

    if(postImageOrError.isFailure){
      console.error(postImageOrError.getErrorValue());
      throw new ParseException(["ISequelizePostImageRaw", "PostImage"], postImageOrError.getErrorValue())
    }

    return postImageOrError.getValue();
  };


  public toPersistence(entity: PostImage): Required<ISequelizePostImageRaw>{
    if(!entity) {
      throw new ArgumentNotProvidedException("Argument entity not provided when parsing to persistance")
    };
    
    return {
      id: entity.id.toString(),
      name: entity.name,
      size: entity.size,
      file_type: entity.fileType,
      group: entity.group,
      image_type: entity.imageType
    }
  };
}