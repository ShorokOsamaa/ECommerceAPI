const pool = require("../db/db");

class User {
  constructor(username, email, passwordHash) {
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  save() {
    const result = pool.query(
      "INSERT INTO Users(username, email, password) VALUES (?, ?, ?)",
      [this.username, this.email, this.passwordHash]
    );

    return result;
  }

  static findUserByEmail(email) {
    const result = pool.query("SELECT * FROM Users WHERE email = ?;", [email]);
    return result;
  }
}

module.exports = User;
