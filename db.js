const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "your_host",         // e.g., remotemysql.com
    user: "your_username",
    password: "your_password",
    database: "your_db_name"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

module.exports = db;
