import { ICommonFile } from "~/common/domain/common/common-file.interface";
import { IStorageService } from "../../storage.service.interface";
import fs from "node:fs/promises"
import path from "node:path";





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