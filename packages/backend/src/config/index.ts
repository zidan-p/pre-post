
export const authConfig = {
  secret: process.env.JWT_SECRET,
  tokenExpiryTime: 300, // seconds => 5 minutes
}


export const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}