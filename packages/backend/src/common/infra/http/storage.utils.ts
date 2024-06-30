import { join } from "path";
import { ICommonFile } from "~/common/domain/common/common-file.interface";



export function getStorageFilePath(storageRootPath: string,file: ICommonFile){
  const target = join(storageRootPath, file.group, file.name);
  return target;
}