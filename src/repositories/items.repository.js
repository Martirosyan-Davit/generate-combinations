export class ItemsRepository {
  static async createItems(conn, items) {
    try {
      const values = items.map((item) => [item.itemCode, item.prefix]);

      const [result] = await conn.query(
        `INSERT INTO items (item_code, prefix) 
         VALUES ? 
         ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
        [values],
      );

      return result.affectedRows;
    } catch (error) {
      throw new Error(`Failed to create items: ${error.message}`);
    }
  }
}
