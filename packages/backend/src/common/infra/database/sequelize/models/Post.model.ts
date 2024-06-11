import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute, Sequelize, DataTypes, BelongsToCreateAssociationMixin, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin, HasOneCreateAssociationMixin, HasOneSetAssociationMixin, HasOneGetAssociationMixin } from 'sequelize';
import { User } from './User.model';
import { PostImage } from './PostImage.model';

// order of InferAttributes & InferCreationAttributes is important.
export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<string>;
  declare title: string;
  declare content: string;
  declare owner_id: ForeignKey<User["id"]>;
  declare image_id: ForeignKey<PostImage["id"]>;
  // is the article published or still in owner vault
  declare is_published: boolean;
  // a little unnecessary, but ok
  declare date_time_created: Date;
  declare date_time_posted?: Date;
    // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;

  // mixin...
  declare createOwner: BelongsToCreateAssociationMixin<User>;
  declare setOwner: BelongsToSetAssociationMixin<User, string>;
  declare getOwner: BelongsToGetAssociationMixin<User>;

  declare createImage: HasOneCreateAssociationMixin<PostImage>;
  declare setImage: HasOneSetAssociationMixin<PostImage, string>;
  declare getImage: HasOneGetAssociationMixin<PostImage>;

  declare image?: NonAttribute<PostImage>;
  declare owner?: NonAttribute<User>;
}

export type PostModelImplementation = typeof Post;

export function initPost(sequelize: Sequelize){

  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // owner_id: {
      //   type: DataTypes.UUIDV4,
      //   allowNull: false,
      //   references: {
      //     model: User,
      //     key: "id"
      //   }
      // },
      // image_id: {
      //   type: DataTypes.UUIDV4,
      //   allowNull: true,
      //   references: {
      //     model: PostImage,
      //     key: "id"
      //   }
      // },
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT
      },
      is_published: DataTypes.BOOLEAN,
      date_time_created: DataTypes.DATE,
      date_time_posted: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },{
      sequelize,
      tableName: 'posts'  
    }
  )

  return Post;
}


export function associatePost(){
  Post.belongsTo(User,{
    as: "owner",
    foreignKey: "owner_id"
  });

  Post.hasOne(PostImage, {as: "image", foreignKey: "post_id"})
}