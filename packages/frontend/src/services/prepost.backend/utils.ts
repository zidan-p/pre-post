/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertToDotNotation, isObjectExcludeArray } from "@shared/utils/object";




export function convertFlattenObjectToFormData(obj: Record<string, any>): FormData{
  const formData = new FormData();

  for(const key in obj) formData.append(key, obj[key]);

  return formData;
}


export function convertObjectToFormData(obj: Record<string, any>):FormData{
  const flattenDotNotation = convertToDotNotation(obj);
  return convertFlattenObjectToFormData(flattenDotNotation);
}

/**
 * please aware if this checking is far from perfect.
 * @todo improve checking for file upload
 * @param obj 
 * @returns 
 */
export function convertObjectToFormDataWithRactAdminFileResolver(obj: Record<string, any>):FormData{
  const data: Record<string, any> = {};
  // separate file from object
  const files: Record<string, File> = {};
  for (const key in obj){

    // catch react admin file
    if (isObjectExcludeArray(obj[key])){
      if("rawFile" in obj[key]) files[key] = obj[key].rawFile; 
    }
    else data[key] = obj[key];
  }

  const flattenDotNotationData = convertToDotNotation(data);
  return convertFlattenObjectToFormData({...flattenDotNotationData, ...files});
}