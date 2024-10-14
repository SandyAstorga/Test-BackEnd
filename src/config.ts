import * as dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
  server: process.env.DB_SERVER || '', 
  port: parseInt(process.env.DB_PORT || '1433'),
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_CATALOG || '',
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
};
