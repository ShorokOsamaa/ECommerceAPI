const pool = require("../db/db");

class Product {
  constructor(name, category, price, imagePath, description) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.imagePath = imagePath;
    this.description = description;
  }

  save() {
    const result = pool.query(
      "INSERT INTO Products(name, category, price, imagePath, description) VALUES (?, ?, ?, ?, ?)",
      [this.name, this.category, this.price, this.imagePath, this.description]
    );

    return result;
  }

  static findAll() {
    const result = pool.query("SELECT * FROM Products;");
    return result;
  }

  static findProductById(id) {
    const result = pool.query("SELECT * FROM Products WHERE id = ?;", [id]);
    return result;
  }

  static updateProduct(id, data) {
    const { name, category, price, imagePath, description } = data;

    const result = pool.query(
      "REPLACE INTO Products(id, name, category, price, imagePath, description) VALUES (?, ?, ?, ?, ?, ?)",
      [id, name, category, price, imagePath, description]
    );

    return result;
  }

  static deleteProduct(id) {
    const result = pool.query("DELETE FROM Products WHERE id = ?;", [id]);
    return result;
  }
}

module.exports = Product;
