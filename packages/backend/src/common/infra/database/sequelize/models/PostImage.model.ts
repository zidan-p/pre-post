import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute, Sequelize, DataTypes, BelongsToCreateAssociationMixin, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin, HasOneCreateAssociationMixin, HasOneSetAssociationMixin, HasOneGetAssociationMixin } from 'sequelize';
import { User } from './User.model';
import { Post } from './Post.model';

// order of InferAttributes & InferCreationAttributes is important.
export class PostImage extends Model<InferAttributes<PostImage>, InferCreationAttributes<PostImage>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<string>;
  declare name: string;
  declare size: number; // in bytes
  declare file_type: string;
  declare image_type: string;
  declare group: string;
  declare post_id: ForeignKey<Post["id"]>;

    // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;

  declare createPost: HasOneCreateAssociationMixin<Post>;
  declare setPost: HasOneSetAssociationMixin<Post, string>;
  declare getPost: HasOneGetAssociationMixin<Post>;

  declare post?: NonAttribute<Post>;
  
}

export type PostImageModelImplementation = typeof PostImage;

export function initPostImage(sequelize: Sequelize){
  PostImage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // post_id: {
      //   type: DataTypes.UUIDV4,
      //   references: {
      //     model: Post
      //   }
      // },
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      file_type: DataTypes.STRING,
      image_type: DataTypes.STRING,
      group: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },{
      sequelize,
      tableName: 'post_images'  
    }
  )

  return PostImage;
}

export function associatePostImage(){
  PostImage.hasOne(Post, {as : "post", foreignKey: "image_id"})
}