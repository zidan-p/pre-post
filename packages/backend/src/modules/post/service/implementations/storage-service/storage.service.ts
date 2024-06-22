import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { IStorageService } from "../../storage.service.interface";
import fs, { cp } from "node:fs/promises"
import path, { extname } from "node:path";
import { generateUniqueSuffix } from "~/common/utils/unique-suffix";
import { fileNameCreator } from "~/common/utils/filename-creator";





export class LocalStorageService implements IStorageService {

  constructor(
    private readonly storagePath: string
  ){}

  async isFileExists(file: ICommonFile) {
    try {
      const filePath = path.join(this.storagePath, file.group, file.name);
      await fs.access(filePath, fs.constants.W_OK | fs.constants.W_OK)
      return true
    } catch (error) {
      return false;
    }
  }

  /**
   * @description i assume the group in CommonFile is the fieldname.
   * @param file 
   */
  async cloneFile(file: ICommonFile): Promise<ICommonFile> {
    const filePath = path.join(this.storagePath, file.group, file.name);

    // new file temp
    const newFileName = fileNameCreator(file.group, extname(file.name));
    const newFilePath = path.join(this.storagePath, newFileName);

    // copy the file
    await cp(filePath, newFilePath);
    console.log("finish copy from [ " + filePath + " ] to [ " + newFilePath + " ]");

    const newFile: ICommonFile = {
      fileType: file.fileType,
      group: file.fileType,
      name: newFileName,
      size: file.size
    };

    return newFile;
  }

  getFileBufer(file: ICommonFile): Promise<Buffer> {
    const filePath = path.join(this.storagePath, file.group, file.name);
    const buffer = fs.readFile(filePath);
    return buffer;
  }

  async removeFile(file: ICommonFile){
    const filePath = path.join(this.storagePath, file.group, file.name);
    await fs.unlink(filePath);
  }

}