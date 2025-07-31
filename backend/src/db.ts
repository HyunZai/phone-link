//import mysql from 'mysql2/promise';
//import dotenv from 'dotenv';
//
//dotenv.config();
//
//export const pool = mysql.createPool({
//    host: process.env.DATABASE_HOST,
//    user: process.env.DATABASE_USER,
//    password: process.env.DATABASE_PASSWORD,
//    database: process.env.DATABASE_NAME,
//    port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306,
//    waitForConnections: true,
//    connectionLimit: 10,
//    queueLimit: 0,
//});
//
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : undefined,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data source has been initialized!");
  } catch (err) {
    console.error("Error during Datasource initialization", err);
  }
})();

