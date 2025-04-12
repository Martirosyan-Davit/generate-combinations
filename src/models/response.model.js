export class CombinationResponse {
  constructor({ id, request_items, request_length, response_data, created_at, updated_at }) {
    this.id = id;
    this.requestItems = JSON.parse(request_items);
    this.requestLength = request_length;
    this.responseData = JSON.parse(response_data);
    this.createdAt = new Date(created_at);
    this.updatedAt = new Date(updated_at);
  }

  toJSON() {
    return {
      id: this.id,
      requestItems: this.requestItems,
      requestLength: this.requestLength,
      responseData: this.responseData,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  static fromDB(row) {
    return new CombinationResponse(row);
  }
}
