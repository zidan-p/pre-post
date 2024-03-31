import { Sequelize } from "sequelize";
import { initPost } from "./Post.model";
import { initUser } from "./User.model";



let models: any = {};
let modelsLoaded = false;

export const initModel = (sequelize: Sequelize) => {
  if (modelsLoaded) return models;

  const post = initPost(sequelize);
  const user = initUser(sequelize);

  models.Post = post;
  models.User = user;

  models['sequelize'] = sequelize;
  models['Sequelize'] = sequelize;

  modelsLoaded = true;
  return models;
}

