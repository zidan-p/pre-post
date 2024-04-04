import { Sequelize } from "sequelize";
import { initModel } from "./models";



const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;


export const sequelizeConnection = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  port: Number(DB_PORT),
  host: DB_HOST,
  dialect: "mysql"
});


export const models = initModel(sequelizeConnection);

async function syncDatabase(){
  await sequelizeConnection.sync();
}

syncDatabase();