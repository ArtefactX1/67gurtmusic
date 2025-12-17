const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'rahasia_negara_api_key_super_aman_2024'; // In production, use .env

app.use(cors());
app.use(express.json());

// Middleware to verify token (for protected routes later)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- Routes ---

// Register
app.post('/api/register', (req, res) => {
  const { name, email, password, role } = req.body;

  // Basic Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Mohon lengkapi semua field.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userRole = role || 'member'; // Default to member

  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  const params = [name, email, hashedPassword, userRole];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Email sudah terdaftar.' });
      }
      return res.status(500).json({ error: err.message });
    }
    
    // Auto login after register? Or just return success
    res.status(201).json({ 
        message: 'Registrasi berhasil!', 
        user: { id: this.lastID, name, email, role: userRole } 
    });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.get(sql, [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Email atau password salah.' });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ error: 'Email atau password salah.' });

    // Generate Token
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '24h' });

    res.json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
});

// Get User Profile (Protected)
app.get('/api/me', authenticateToken, (req, res) => {
    const sql = "SELECT id, name, email, role, created_at FROM users WHERE id = ?";
    db.get(sql, [req.user.id], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: 'User tidak ditemukan.' });
        res.json(user);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
