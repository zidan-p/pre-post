import { join } from "path";
import { ExpressUserMapperFactory } from "../../mapper/express-user-mapper/express-mapper.factory";
import { SequelizeUserMapperFactory } from "../../mapper/seqluelize-user-mapper/sequelize-mapper.factory";
import { appConfig } from "~/config/index";
import { SequelizeUserCachedFactory } from "../../repository/implementation/sequelize/sequelize-user.cached-factory";
import { User } from "~/common/infra/database/sequelize/models/User.model";
import { ExpressUseCaseManagerFactory } from "~/common/infra/http/interactor/express.use-case.manager";
import { CREATE_USER, CreateUserManager } from "../../usecase/create/create-user";
import { DELETE_MANY_USER, DeleteManyUserManager } from "../../usecase/delete/delete-many-user";
import { DELETE_USER, DeleteUserManager } from "../../usecase/delete/delete-user";
import { GET_LIST_USER, GetListUserManager } from "../../usecase/get/get-list-user";
import { GET_MANY_USER, GetManyUserManager } from "../../usecase/get/get-many-user";
import { GET_USER, GetUserManager } from "../../usecase/get/get-user";
import { UPDATE_MANY_USER, UpdateManyUserManager } from "../../usecase/update/update-many-user";
import { UPDATE_USER, UpdateUserManager } from "../../usecase/update/update-user";


const APP_URL = process.env.APP_URL;
const storagePath = join(appConfig.root, "storage");
const resourceUrl = new URL(String(APP_URL)); 

const userPersisterMapperFactory = new SequelizeUserMapperFactory();
const userPresenterMapperFactory = new ExpressUserMapperFactory(resourceUrl);


const userRepositoryFactory = new SequelizeUserCachedFactory(userPersisterMapperFactory, User);

export const userUsecaseManagerFactory = new ExpressUseCaseManagerFactory();


userUsecaseManagerFactory.addUseCaseManager(CREATE_USER, new CreateUserManager(userRepositoryFactory));
userUsecaseManagerFactory.addUseCaseManager(DELETE_MANY_USER, new DeleteManyUserManager(userRepositoryFactory));
userUsecaseManagerFactory.addUseCaseManager(DELETE_USER, new DeleteUserManager(userRepositoryFactory));
userUsecaseManagerFactory.addUseCaseManager(GET_LIST_USER, new GetListUserManager(userRepositoryFactory, userPresenterMapperFactory));
userUsecaseManagerFactory.addUseCaseManager(GET_MANY_USER, new GetManyUserManager(userRepositoryFactory, userPresenterMapperFactory));
userUsecaseManagerFactory.addUseCaseManager(GET_USER, new GetUserManager(userRepositoryFactory, userPresenterMapperFactory));
userUsecaseManagerFactory.addUseCaseManager(UPDATE_MANY_USER, new UpdateManyUserManager(userRepositoryFactory));
userUsecaseManagerFactory.addUseCaseManager(UPDATE_USER, new UpdateUserManager(userRepositoryFactory, userPresenterMapperFactory));
