import { SaveStatus, SaveStatusConst } from "~/common/types/repository";
import { PostImage } from "~/modules/post/domain/post-image.entity";
import { IPostImageRepo } from "../../post-image.repository.port";
import { PostImageModelImplementation } from "~/common/infra/database/sequelize/models/PostImage.model";
import { SequelizePostImageMapper } from "~/modules/post/mappers/sequelize-persistence-mapper/post-image.map";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";







export class SequelizePostImageRepository implements IPostImageRepo{

  constructor(
    private readonly postImageMapper: SequelizePostImageMapper,
    private readonly postImageModel: PostImageModelImplementation
  ){}

  async save(postImage: PostImage): Promise<SaveStatus> {
    const exist = await this.exists(postImage.id.toString());
    const postImageRaw = this.postImageMapper.toPersistence(postImage);

    if(!exist){ // is new
      await this.postImageModel.create(postImageRaw);
      return SaveStatusConst.CREATED;
    }else{
      await this.postImageModel.update(postImageRaw, {where: {id: postImage.id.toString()}});
      return SaveStatusConst.UPDATED;
    }

  }

  async exists(postImageId: string): Promise<boolean>{
    const image = await this.postImageModel.findByPk(postImageId);
    return Boolean(image); 
  }

  async isAlreadySaved(postImage: PostImage): Promise<boolean> {
    return await  this.exists(postImage.id.toString());
  }

  async remove(postImageId: string | UniqueEntityID): Promise<void> {
    const image = await this.postImageModel.findByPk(postImageId.toString());
    await image?.destroy();
    return;
  }
}