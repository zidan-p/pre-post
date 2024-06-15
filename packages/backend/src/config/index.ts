import path from "path"

export const appConfig = {
  appURL : process.env.APP_URL,
  root: path.join(__dirname, "../..")
}

export const authConfig = {
  secret: process.env.JWT_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  tokenExpiryTime: 3600, // seconds => 1 hour
  refreshTokenExpireTime: 1 * 60 * 60 * 24 // in 24 hours
}

export const postConfig = {
  
}


export const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}