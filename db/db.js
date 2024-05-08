require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB Connected Successfully: " + connection.threadId);
});

module.exports = pool.promise();
