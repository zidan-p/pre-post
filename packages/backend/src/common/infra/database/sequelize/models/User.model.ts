




import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import { Post } from './Post.model';

// order of InferAttributes & InferCreationAttributes is important.
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare name: string;
  declare password: string;
  declare email: string;
  declare username: string;
  declare is_admin: boolean;

    // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;


    // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getPosts: HasManyGetAssociationsMixin<Post>; // Note the null assertions!
  declare addPost: HasManyAddAssociationMixin<Post, number>;
  declare addPosts: HasManyAddAssociationsMixin<Post, number>;
  declare setPosts: HasManySetAssociationsMixin<Post, number>;
  declare removePost: HasManyRemoveAssociationMixin<Post, number>;
  declare removePosts: HasManyRemoveAssociationsMixin<Post, number>;
  declare hasPost: HasManyHasAssociationMixin<Post, number>;
  declare hasPosts: HasManyHasAssociationsMixin<Post, number>;
  declare countPosts: HasManyCountAssociationsMixin;
  declare createPost: HasManyCreateAssociationMixin<Post, 'user_id'>;

    // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare posts?: NonAttribute<Post[]>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    posts: Association<User, Post>;
  };
}

export type UserModelImplementation = typeof User;

export function initUser(sequelize: Sequelize){
  const definedUser = User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      username: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
      },
      is_admin: {
        type: DataTypes.BOOLEAN
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      tableName: 'users'  
    }
  )

  User.hasMany(Post, {
    sourceKey: "id",
    foreignKey: "user_id",
    as: "posts",
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })

  return definedUser;
}
