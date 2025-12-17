const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'member',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error("Error creating table:", err);
        } else {
            // Check if admin exists, if not create one
            const checkAdmin = "SELECT * FROM users WHERE email = ?";
            db.get(checkAdmin, ["admin@harmoni.com"], (err, row) => {
                if (!row) {
                    const insert = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
                    const adminPass = bcrypt.hashSync("admin123", 10);
                    db.run(insert, ["Super Admin", "admin@harmoni.com", adminPass, "admin"]);
                    console.log("Default admin account created: admin@harmoni.com / admin123");
                }
            });
        }
    });
  }
});

module.exports = db;
