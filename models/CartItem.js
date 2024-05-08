const pool = require("../db/db");

class CartItem {
  constructor(userId, productId, quantity, exist) {
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.exist = exist;
  }

  save() {
    if (this.exist) {
      const result = pool.query(
        "UPDATE CartItems SET quantity = ? WHERE userId = ? AND productId = ?;",
        [this.quantity, this.userId, this.productId]
      );
      return result;
    } else {
      const result = pool.query(
        "INSERT INTO CartItems(userId, ProductId, quantity) VALUES (?, ?, ?);",
        [this.userId, this.productId, this.quantity]
      );
      return result;
    }
  }

  static getCart(userId) {
    const result = pool.query("SELECT * FROM CartItems WHERE userId = ?;", [
      userId,
    ]);
    return result;
  }

  static deleteItem(userId, productId, quantity, existQuantity) {
    if (existQuantity > quantity) {
      const result = pool.query(
        "UPDATE CartItems SET quantity = ? WHERE userId = ? AND productId = ?;",
        [existQuantity - quantity, userId, productId]
      );
      return result;
    } else {
      const result = pool.query(
        "DELETE FROM CartItems WHERE userId = ? AND productId = ?;",
        [userId, productId]
      );
      return result;
    }
  }

  static itemExist(userId, productId) {
    const searchResult = pool.query(
      "SELECT * FROM CartItems WHERE userId = ? AND productId = ?;",
      [userId, productId]
    );
    return searchResult;
  }
}

module.exports = CartItem;
