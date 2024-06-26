

// connect the database
import { InternalServerErrorException } from "../exceptions";
import "./database/sequelize/connection";
import { loadSequelizeOrm } from "./database/sequelize/connection";
import { validateEnvService } from "./env/validate-env.service";


// congfig env variable

// start the server
import "./http/app";
import { loadExpressServer } from "./http/app";
import { WinstonPrePostLoggger } from "./logger/winston/pre-post-logger.winston";



export class AppMainInfra{

  private readonly logger = new WinstonPrePostLoggger(AppMainInfra.name);

  async load(){
    this.validateEnv();
    await this.loadDatabase();
    loadExpressServer();
  }

  async loadDatabase(){ await loadSequelizeOrm();}

  loadHttpServer(){ loadExpressServer() }

  validateEnv(){
    const result = validateEnvService();
    if(!result){
      this.logger.error("Invalid env object");
      throw new InternalServerErrorException("Invalid ENV Object");
    }

  }
}