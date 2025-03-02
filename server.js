const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = []; // In-memory storage for users (not persistent)

// Signup route
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  // Check if user already exists
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: "Username already taken." });
  }

  // Add the new user to the in-memory array
  users.push({ username, password });
  return res.status(201).json({ message: "Registration successful!" });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  // Find user
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials." });
  }

  return res.status(200).json({ message: "Login successful!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
