import * as dotenv from 'dotenv';
import sql, { ConnectionPool } from 'mssql';
import { highestSale, mostSoldByStore, topBrandMargin, topProductSales, topStoreSales, totalSales30Days } from './queries';
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

let pool: ConnectionPool | null = null;

const getConnection = async (): Promise<ConnectionPool> => {
  try {
    if (pool) return pool;
    pool = await sql.connect(dbConfig);
    console.log('Conexión exitosa a la base de datos');
    return pool;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};


export const executeQuery = async (query: string) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(query);
    console.log('Resultado de la consulta:', result.recordset);
    return result.recordset;
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
  }
};

// Ejecutar consultas y mostrar resultados en consola
const showResults = async () => {
  console.log(await totalSales30Days());
  console.log(await highestSale());
  console.log(await topProductSales());
  console.log(await topStoreSales());
  console.log(await topBrandMargin());
  console.log(await mostSoldByStore());
};

showResults();
