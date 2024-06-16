import { ICommonFile } from "~/common/domain/common/common-file.interface";






export interface IStorageService{
  
  isFileExists(file: ICommonFile): Promise<boolean>;
  getFileBufer(file: ICommonFile): Promise<Buffer>;
  removeFile(file: ICommonFile): Promise<void>;
}