import 'dotenv/config';

import mysql from 'mysql2/promise';

import { logger } from '../utils/logger.js';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bikini_combinations',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on('connection', (conn) => {
  logger.info('MySQL connection established');
});

pool.on('error', (err) => {
  logger.error('MySQL pool error:', err);
});

export const getConnection = async () => {
  try {
    return await pool.getConnection();
  } catch (error) {
    logger.error('Failed to get DB connection:', error);

    throw error;
  }
};

export const executeTransaction = async (operations) => {
  let conn;

  try {
    conn = await getConnection();
    await conn.beginTransaction();

    const result = await operations(conn);

    await conn.commit();

    return result;
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }

    logger.error('Transaction failed:', error);

    throw error;
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
