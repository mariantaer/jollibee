const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
    res.send("Jollibee Franchise Application Server is running!");
});

// Submit franchise application
app.post("/submit", (req, res) => {
    const { full_name, email, phone_number, preferred_location, interest } = req.body;

    if (!full_name || !email || !phone_number || !preferred_location || !interest) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const query = `
        INSERT INTO franchise_applications
        (full_name, email, phone_number, preferred_location, interest)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [full_name, email, phone_number, preferred_location, interest], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error." });
        }
        res.json({ message: "Application submitted successfully!" });
    });
});

// Start server on Render port or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
