import { withLifecycleCallbacks } from "react-admin";
import { BasePrepostDataProvider } from "./data-provider";



export function prepostDataProvider(url: string){
  const baseDataProvider = new BasePrepostDataProvider(url)
  
  return withLifecycleCallbacks(
    baseDataProvider,
    [
      {
        // use form data for posts
        resource: "posts",
        beforeGetManyReference: async params => {
          if(params.target === "ownerId")return {...params, target: "userId"}
          return params;
        },
        beforeCreate: async params => ({...params, meta: {...params?.meta, isFormData: true}}), 
        beforeUpdate: async params => ({...params, meta: {...params?.meta, isFormData: true}}), 
        beforeUpdateMany: async params => ({...params, meta: {...params?.meta, isFormData: true}}) 
      }
    ]
  )
}