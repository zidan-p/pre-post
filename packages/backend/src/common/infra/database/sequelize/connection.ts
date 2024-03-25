import { Sequelize } from "sequelize";



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

