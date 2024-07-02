import { convertToDotNotation } from "../utils/object";






export function convertFlattenObjectToFormData(obj: Record<string, any>): FormData{
  const formData = new FormData();

  for(const key in obj) formData.append(key, obj[key]);

  return formData;
}


export function convertObjectToFormData(obj: Record<string, any>):FormData{
  const flattenDotNotation = convertToDotNotation(obj);
  return convertFlattenObjectToFormData(flattenDotNotation);
}