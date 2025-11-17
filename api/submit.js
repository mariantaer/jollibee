import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { full_name, email, phone_number, preferred_location, interest } = req.body;

  if (!full_name || !email || !phone_number || !preferred_location || !interest) {
    return res.status(400).json({ message: "All fields required." });
  }

  try {
    // Connect to remote database
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    await db.execute(
      "INSERT INTO franchise_applications (full_name, email, phone_number, preferred_location, interest) VALUES (?, ?, ?, ?, ?)",
      [full_name, email, phone_number, preferred_location, interest]
    );

    await db.end();
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error." });
  }
}
