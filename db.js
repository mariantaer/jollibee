const mysql = require("mysql2");

// Use environment variables for security and portability
const db = mysql.createConnection({
    host: process.env.DB_HOST,         // e.g., remotemysql.com or Render DB host
    user: process.env.DB_USER,         // DB username
    password: process.env.DB_PASS,     // DB password
    database: process.env.DB_NAME      // DB name
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

module.exports = db;
