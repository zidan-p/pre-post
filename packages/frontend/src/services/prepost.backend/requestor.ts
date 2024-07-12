import axios from "axios";



const requestor = axios.create({
  baseURL: import.meta.env.VITE_PREPOST_URL
});

let axiosInterceptor: number;

/** 
 * set axios bearer token  
 * */
export function setRequestAccessToken(token : string){
  axiosInterceptor = requestor.interceptors.request.use(config => {
    const newConfig = {...config}
    newConfig.headers["Authorization"] = `Bearer ${token}`;

    return newConfig
  })
}


export function clearRequestAccessToken(){
  // requestor.interceptors.request.clear();
  requestor.interceptors.request.eject(axiosInterceptor);
}

export {requestor}