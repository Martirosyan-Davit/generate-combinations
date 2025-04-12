export class Item {
  constructor({ id, item_code, prefix, created_at, updated_at }) {
    this.id = id;
    this.itemCode = item_code;
    this.prefix = prefix;
    this.createdAt = new Date(created_at);
    this.updatedAt = new Date(updated_at);
  }

  toJSON() {
    return {
      id: this.id,
      itemCode: this.itemCode,
      prefix: this.prefix,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  static fromRequest(data) {
    return new Item({
      item_code: data.itemCode,
      prefix: data.prefix,
    });
  }
}
