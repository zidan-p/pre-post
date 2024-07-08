import { withLifecycleCallbacks } from "react-admin";
import { BasePrepostDataProvider } from "./data-provider";



export function prepostDataProvider(url: string){
  const baseDataProvider = new BasePrepostDataProvider(url)
  
  return withLifecycleCallbacks(
    baseDataProvider,
    [
      // {
      //   // use form data for posts
      //   resource: "posts",
      //   beforeGetManyReference: params => {
      //     if(params.target === "ownerId")return {...params, target: "userId"}
      //     return params;
      //   },
      //   beforeCreate: params => ({...params, meta: {...params?.meta, isFormData: true}}), 
      //   beforeUpdate: params =>{ 
      //     console.log
      //     console.log(params);
      //     return ({...params, meta: {...params?.meta, isFormData: true}})
      //   }, 
      //   beforeUpdateMany: params => ({...params, meta: {...params?.meta, isFormData: true}}) 
      // }
    ]
  )
}