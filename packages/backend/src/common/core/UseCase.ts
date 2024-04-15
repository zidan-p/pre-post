import { ICommonFile } from "../domain/common/common-file.interface";

export interface UseCase<IRequest, IResponse> {
  execute (request?: IRequest) : Promise<IResponse> | IResponse;
  execute (request: IRequest, files: Record<string, ICommonFile>) : Promise<IResponse> | IResponse;
}