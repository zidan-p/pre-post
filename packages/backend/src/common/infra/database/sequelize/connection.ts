import { Sequelize } from "sequelize";
import { initModel } from "./models";



const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

let sequelizeConnection: Sequelize;
export async function loadSequelizeOrm(){
  
  sequelizeConnection = new Sequelize(DB_DATABASE as string, DB_USERNAME as string, DB_PASSWORD, {
    port: Number(DB_PORT),
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      
    }
  });
  
  const models = initModel(sequelizeConnection);
  
  // sequelizeConnection.sync();

}