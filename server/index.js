
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ticketara',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// User Registration
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    
    // Generate token
    const token = jwt.sign(
      { id: result.insertId, email, name }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({ 
      message: 'User created successfully',
      token,
      user: { id: result.insertId, name, email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    
    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
app.get('/api/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Purchase ticket
app.post('/api/tickets/purchase', authenticateToken, async (req, res) => {
  try {
    const { gameId, selectedSeats, totalPrice } = req.body;
    const userId = req.user.id;
    
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Create the order
      const [orderResult] = await connection.query(
        'INSERT INTO orders (user_id, game_id, total_amount, created_at) VALUES (?, ?, ?, NOW())',
        [userId, gameId, totalPrice]
      );
      
      const orderId = orderResult.insertId;
      
      // Insert each seat
      for (const seat of selectedSeats) {
        await connection.query(
          'INSERT INTO order_items (order_id, seat_number, seat_category, price) VALUES (?, ?, ?, ?)',
          [orderId, seat.number, seat.category, getSeatPrice(seat.category)]
        );
        
        // Mark seat as taken for this game
        await connection.query(
          'INSERT INTO reserved_seats (game_id, seat_number) VALUES (?, ?)',
          [gameId, seat.number]
        );
      }
      
      await connection.commit();
      
      res.status(201).json({ 
        message: 'Tickets purchased successfully',
        orderId,
        tickets: selectedSeats.length
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Ticket purchase error:', error);
    res.status(500).json({ error: 'Failed to purchase tickets' });
  }
});

// Get user's tickets
app.get('/api/tickets', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [orders] = await pool.query(
      `SELECT o.id as order_id, o.game_id, o.total_amount, o.created_at, 
              GROUP_CONCAT(oi.seat_number) as seats
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = ?
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );
    
    res.json({ tickets: orders });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ error: 'Failed to retrieve tickets' });
  }
});

// Helper function to get seat price
function getSeatPrice(category) {
  const prices = {
    'vip': 300,
    'premium': 200, 
    'standard': 150,
    'economy': 100
  };
  
  return prices[category] || 100;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API is available at http://localhost:${PORT}/api`);
});
