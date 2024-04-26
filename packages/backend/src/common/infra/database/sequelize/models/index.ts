import { Sequelize } from "sequelize";
import { initPost } from "./Post.model";
import { initUser } from "./User.model";
import { initPostImage } from "./PostImage.model";



let models: any = {};
let modelsLoaded = false;

export function isModelLoaded(): boolean{
  return modelsLoaded;
} 

export const initModel = (sequelize: Sequelize) => {
  if (modelsLoaded) return models;

  const post = initPost(sequelize);
  const user = initUser(sequelize);
  const postImage = initPostImage(sequelize);

  models.Post = post;
  models.User = user;
  models.postImage = postImage;

  models['sequelize'] = sequelize;
  models['Sequelize'] = sequelize;

  modelsLoaded = true;
  return models;
}

