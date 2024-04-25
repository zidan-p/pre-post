import { SaveStatus } from "~/common/types/repository";
import { CommonImage } from "../domain/image.interface";

export interface IImageRepo{
  save(payload: CommonImage): Promise<SaveStatus>;
}