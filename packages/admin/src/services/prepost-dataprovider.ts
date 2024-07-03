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
        beforeCreate: async params => ({...params, meta: {...params?.meta, isFormData: true}}), 
        beforeUpdate: async params => ({...params, meta: {...params?.meta, isFormData: true}}), 
        beforeUpdateMany: async params => ({...params, meta: {...params?.meta, isFormData: true}}) 
      }
    ]
  )
}