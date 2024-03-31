import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute, Sequelize, DataTypes } from 'sequelize';
import { User } from './User.model';

// order of InferAttributes & InferCreationAttributes is important.
export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare title: string;
  declare user_id: ForeignKey<"id">;

    // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;


  declare user?: NonAttribute<User>;
  
}

export function initPost(sequelize: Sequelize){
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },{
      sequelize,
      tableName: 'posts'  
    }
  )

  return Post;
}