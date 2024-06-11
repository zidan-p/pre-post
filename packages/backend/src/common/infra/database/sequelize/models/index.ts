import { Sequelize } from "sequelize";
import { associatePost, initPost } from "./Post.model";
import { associateUser, initUser } from "./User.model";
import { associatePostImage, initPostImage } from "./PostImage.model";



let models: any = {};
let modelsLoaded = false;

export function isModelLoaded(): boolean{
  return modelsLoaded;
} 

export const initModel = (sequelize: Sequelize) => {
  if (modelsLoaded) return models;

  const user = initUser(sequelize);
  const post = initPost(sequelize);
  const postImage = initPostImage(sequelize);
  
  // -- associate all model--
  associatePost();
  associatePostImage();
  associateUser();

  models.Post = post;
  models.User = user;
  models.postImage = postImage;

  models['sequelize'] = sequelize;
  models['Sequelize'] = sequelize;

  modelsLoaded = true;
  return models;
}

