import { IPostRepo } from "../../repository/post.repository.port";






export abstract class PostAndPaginateUseCase<DTORequest, Response>{

  abstract postRepo: IPostRepo;

  abstract onGetPost

  async execute(request: DTORequest): Promise<Response>{

  }
}