const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const JWT_SECRET = 'my_secret_key_123'; // In production, store this in a .env file

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

const users = [];

app.get('/', (req, res) => {
  res.json({
    message: 'sign up functionality',
  });
});

// Sign up functionality
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Please enter the username and password' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password length should be at least 6 characters' });
  }

  const cleanUserName = username.trim();

  const existingUser = users.find((u) => u.username === cleanUserName);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      username: cleanUserName,
      password: hashedPassword,
      isCreatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    return res.status(201).json({
      message: 'User signed up successfully',
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (error) {
    console.log('show error', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Login functionality (generates and returns JWT)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Please enter the username and password' });
  }

  const user = users.find((u) => u.username === username.trim());
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login Successfully',
      token: token,
    });
  } catch (error) {
    console.log('show error', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expects "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    req.user = decodedUser;
    next();
  });
}

// Example protected route
app.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Protected profile data accessed!',
    user: req.user,
  });
});

app.listen(port, () => {
  console.log('server is running at port 5000');
});
