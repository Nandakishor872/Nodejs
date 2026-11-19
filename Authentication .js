require('dotenv').config(); // Run: npm install dotenv
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD, // Moved to .env file
  database: process.env.DB_NAME || 'postgres',
  port: process.env.DB_PORT || 5432,
  max: 10,
});

// Assumes `id` is SERIAL / IDENTITY in PostgreSQL
async function insertUser(username, hashedPassword) {
  const query = `
        INSERT INTO users (username, passwordhash, userregisteredat)
        VALUES ($1, $2, $3)
        RETURNING id, username
    `;
  const values = [username.trim(), hashedPassword, new Date()];
  const result = await db.query(query, values);
  return result.rows[0];
}

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/create', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || username.trim() === '') {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await insertUser(username, hashedPassword);

    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    // Handle duplicate username error (PostgreSQL unique_violation)
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Username already exists' });
    }

    console.error('Signup Error:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running successfully on port ${port}`);
});
