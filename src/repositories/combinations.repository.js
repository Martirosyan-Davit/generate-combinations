export class CombinationsRepository {
  static async createCombination(conn, combinationId, items) {
    try {
      const values = items.map((item) => [combinationId, item.itemCode]);

      const [result] = await conn.query(
        `INSERT INTO combinations (combination_id, item_code) 
         VALUES ?`,
        [values],
      );

      return result.affectedRows;
    } catch (error) {
      throw new Error(`Failed to create combination: ${error.message}`);
    }
  }
}
