export class ResponsesRepository {
  static async createResponse(conn, items, length, combinations) {
    try {
      const [result] = await conn.query(
        `INSERT INTO responses 
         (request_items, request_length, response_data) 
         VALUES (?, ?, ?)`,
        [JSON.stringify(items), length, JSON.stringify(combinations)],
      );

      return result.insertId;
    } catch (error) {
      throw new Error(`Failed to create response: ${error.message}`);
    }
  }
}
