import { readFile } from 'fs/promises';
import path from 'path';

import { executeTransaction } from '../config/database.js';
import * as Repositories from '../repositories/index.js';
import { logger } from '../utils/logger.js';
import { CombinationService } from './combination.service.js';

export class DatabaseService {
  static async saveCombinationResult(items, length) {
    try {
      const generatedItems = CombinationService.generateItems(items);
      const combinations = CombinationService.getValidCombinations(generatedItems, length);
      const formattedCombinations = CombinationService.formatCombinations(combinations);
      const flatItems = CombinationService.flattenCombinations(combinations);

      return await executeTransaction(async (conn) => {
        await Repositories.ItemsRepository.createItems(conn, generatedItems);

        const responseId = await Repositories.ResponsesRepository.createResponse(
          conn,
          items,
          length,
          formattedCombinations,
        );

        await Repositories.CombinationsRepository.createCombination(conn, responseId, flatItems);

        return {
          responseId,
          combinations: formattedCombinations,
        };
      });
    } catch (error) {
      logger.error('Database service error:', error);

      throw error;
    }
  }

  static async initializeDatabase() {
    try {
      const sqlPath = path.resolve('src/sql/01-init-tables.sql');
      const sql = await readFile(sqlPath, 'utf8');

      await executeTransaction(async (conn) => {
        try {
          await conn.query({ sql, multipleStatements: true });
        } catch {
          const statements = sql
            .split(';')
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

          for (const statement of statements) {
            // eslint-disable-next-line no-await-in-loop
            await conn.query(statement);
          }
        }
      });

      logger.info('Database tables created successfully');
    } catch (error) {
      logger.error('Database initialization failed:', error);

      throw error;
    }
  }
}
