import "dotenv/config";

export default {
  app: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    dateStrings: true
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES
  }
};
