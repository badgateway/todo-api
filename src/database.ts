import * as mysql from 'mysql2/promise';

let poolInstance: mysql.Pool | null = null;

function getSettings(): mysql.PoolOptions {

  return {
    user: process.env.MYSQL_USER || process.env.USER,
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'todo_api',
    host: process.env.MYSQL_HOST || '127.0.0.1',
  };
}

export async function checkPatches() {

  const pool = getPool();
  const [result] = await pool.query<mysql.RowDataPacket[]>('SELECT max(id) as max FROM changelog');
  console.log('last applied patch number: %i', result[0].max);
}

export function getPool(): mysql.Pool {

  if (poolInstance!==null) {
    return poolInstance;
  }
  const settings = getSettings();
  console.log('Using MySQL: mysql://%s@%s/%s', settings.user, settings.host, settings.database);
  poolInstance = mysql.createPool(settings);
  return poolInstance;

}

export async function query<T extends Record<string, any> = Record<string, any>>(query: string, args?: any): Promise<T[]> {

  const pool =  getPool();
  const [result] = await pool.query<mysql.RowDataPacket[]>(query, args);
  return result as T[];

}

export async function insert(query: string, args: any): Promise<number> {

  const pool = getPool();
  const result = await pool.query<mysql.OkPacket>(query, args);
  return result[0].insertId;

}

export default (): mysql.Pool => {

  const pool = getPool();
  return pool;

};
