import { SaveStatus } from "~/common/types/repository";
import { PostImage } from "~/modules/post/domain/post-image.entity";
import { IPostImageRepo } from "../../post-image.repository.port";
import { PostImageModelImplementation } from "~/common/infra/database/sequelize/models/PostImage.model";
import { SequelizePostImageMapper } from "~/modules/post/mappers/sequelize-mapper/post-image.map";







export class SequelizePostImageRepository implements IPostImageRepo{

  constructor(
    private readonly postImageMapper: SequelizePostImageMapper,
    private readonly postImageModel: PostImageModelImplementation
  ){}

  async save(postImage: PostImage): Promise<SaveStatus> {
    const exist = this.exists(postImage.id.toString());
    const postImageRaw = this.postImageMapper.toPersistence(postImage);

    if(!exist){ // is new
      await this.postImageModel.create(postImageRaw);
      return 1;
    }else{
      await this.postImageModel.update(postImageRaw, {where: {id: postImage.id.toString()}});
      return 0;
    }

  }

  async exists(postImageId: string): Promise<boolean>{
    const image = await this.postImageModel.findByPk(postImageId);
    return Boolean(image); 
  }

  async isAlreadySaved(postImage: PostImage): Promise<boolean> {
    return await  this.exists(postImage.id.toString());
  }
}