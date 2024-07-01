import { UseCase } from "~/common/core/use-case";
import { AppError } from "~/common/core/app.error";
import { Result, left, right } from "~/common/core/result";
import { GetListUserDTORequest } from "./get-list-user.dto";
import { GetListUserResponse } from "./get-list-user.response";
import { IUserRepo } from "~/modules/user/repository/user.respository.port";
import { prePostLogger } from "~/common/core/logger.entry";


export class GetListUserUseCase implements UseCase<GetListUserDTORequest, Promise<GetListUserResponse>>{

  constructor(
    private readonly userRepo: IUserRepo
  ){}

  async execute(request: GetListUserDTORequest): Promise<GetListUserResponse> {
    try{
      const whereIncluded = request?.query?.whereIncluded;
      const whereExcluded = request?.query?.whereExcluded;
      const orderBy = request?.query?.orderBy;
      const where = request?.query?.where;
      const page = request?.query?.page;
      const dataPerPage = request?.query?.dataPerPage;
      const paginateQuery = {page, dataPerPage};

      const users = await this.userRepo.find({where, orderBy, paginate: paginateQuery, whereExcluded, whereIncluded});
      const paginate = await this.userRepo.findPaginate({where, orderBy, paginate: paginateQuery, whereExcluded, whereIncluded});

      return right(Result.ok({paginate, users}));
    } catch (error) {
      prePostLogger.error(error);
      return left(new AppError.UnexpectedError(error.toString()));
    }
  }
  
}