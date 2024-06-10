import { z } from "zod";



export const envSchema = z.object({
  APP_URL : z.string(),
  DB_CONNECTION : z.string(),
  DB_HOST : z.string(),
  DB_PORT : z.string(),
  DB_DATABASE : z.string(),
  DB_USERNAME : z.string(),
  DB_PASSWORD : z.string(),
  JWT_SECRET : z.string(),
  JWT_REFRESH_SECRET : z.string()
})