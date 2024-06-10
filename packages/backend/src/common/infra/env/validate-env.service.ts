import { envSchema } from "./env.schema";



export function validateEnvService(){
  const env = process.env;

  const result = envSchema.safeParse(env);

  if(result.success) return true;
  
  console.error(result.error);

  return false;

}