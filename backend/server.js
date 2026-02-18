const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("MySQL Connected...");
    }
});

app.post("/api/leaves", (req, res) => {
    const { user_id, leave_type, from_date, to_date, reason } = req.body;

    const sql = `INSERT INTO leaves (user_id, leave_type, from_date, to_date, reason)
                 VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [user_id, leave_type, from_date, to_date, reason], 
    (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Leave Applied Successfully" });
    });
});

app.get("/api/leaves", (req, res) => {
    const sql = `
        SELECT leaves.id, users.name, leave_type, from_date, to_date, reason, status
        FROM leaves
        JOIN users ON leaves.user_id = users.id
        ORDER BY leaves.id DESC
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
