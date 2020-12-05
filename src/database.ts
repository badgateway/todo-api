import * as mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

function getSettings(): mysql.PoolOptions {

  return {
    user: process.env.MYSQL_USER || process.env.USER,
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'todo_api',
    host: process.env.MYSQL_HOST || '127.0.0.1',
  }
}

export async function init() {

  const settings = getSettings();
  console.log('Using MySQL: mysql://%s@%s/%s', settings.user, settings.host, settings.database);
  pool = mysql.createPool(settings);
  const [result] = await pool.query<mysql.RowDataPacket[]>('SELECT max(id) as max FROM changelog');
  console.log('last applied patch number: %i', result[0].max);
}

export async function query<T extends Record<string, any> = Record<string, any>>(query: string, ...args: any[]): Promise<T[]> {

  if (pool === null) {
    throw new Error('Cannot use MySQL before it was initialized');
  }
  const [result] = await pool.query<mysql.RowDataPacket[]>(query, args);
  return result as T[];

}

export default (): mysql.Pool => {

  if (pool === null) {
    throw new Error('Cannot use MySQL before it was initialized');
  }
  return pool;

}
