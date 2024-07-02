import { withLifecycleCallbacks } from "react-admin";
import { PrepostDataProvider } from "./data-provider";



const baseDataProvider = new PrepostDataProvider("http://localhost:3006")

export const refinedDataProvider = withLifecycleCallbacks(
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