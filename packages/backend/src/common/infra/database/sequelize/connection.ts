import { Sequelize } from "sequelize";
import { initModel } from "./models";



const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

export async function loadSequelizeOrm(){
  const sequelizeConnection = new Sequelize(DB_DATABASE as string, DB_USERNAME as string, DB_PASSWORD, {
    port: Number(DB_PORT),
    host: DB_HOST,
    dialect: "mysql"
  });
  
  const models = initModel(sequelizeConnection);
  
  await sequelizeConnection.sync();

}