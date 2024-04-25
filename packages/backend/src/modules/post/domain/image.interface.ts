import { ICommonFile } from "~/common/domain/common/common-file.interface";




export interface CommonImage extends ICommonFile{
  imageType: string;
}