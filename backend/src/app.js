// src/app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes'); // fixed typo
const foodRoutes = require('./routes/food.routes');
const cors = require('cors');

const app = express();

// ----------------------
// MIDDLEWARE
// ----------------------
app.use(
  cors({
    origin: ["https://food-app-seven-wheat.vercel.app"], // real frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// ----------------------
// ROUTES
// ----------------------
app.get('/', (req, res) => {
  res.send("Systumm...");
});

app.get('/test', (req, res) => {
  res.send("Backend is live!");
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

// ----------------------
// 404 HANDLER
// ----------------------
app.use("/*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
