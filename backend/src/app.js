const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');

const app = express();

// 1️⃣ CORS must come **before** routes and JSON parsing
app.use(cors({
  origin: [
    'https://food-app-seven-wheat.vercel.app',
    'http://localhost:5173' // for local dev
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2️⃣ Other middleware
app.use(express.json());
app.use(cookieParser());

// 3️⃣ Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

// 4️⃣ 404 handler
app.use('/*', (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
