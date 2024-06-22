import { generateUniqueSuffix } from "./unique-suffix";





export function fileNameCreator(fieldName: string, extension: string){
  return fieldName + "-" + generateUniqueSuffix() + extension;
}