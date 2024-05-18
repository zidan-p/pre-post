import { ICommonFile } from "../domain/common/common-file.interface";

interface ExecuteMethod<IRequest, IResponse>{
  (request: IRequest) : Promise<IResponse> | IResponse;
  <T extends ICommonFile = ICommonFile>(request: IRequest, files: Record<string, T>) : Promise<IResponse> | IResponse;
}

export interface UseCase<IRequest, IResponse> {
  execute (request: IRequest) : Promise<IResponse> | IResponse;
  // execute <T extends ICommonFile = ICommonFile>(request: IRequest, files: Record<string, T>) : Promise<IResponse> | IResponse;
}