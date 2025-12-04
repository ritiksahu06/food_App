// src/app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodPartnerRoutes = require('./routes/food-parter.routes');
const foodRoutes = require('./routes/food.routes');
const cors = require('cors');

const app = express();

// ----------------------
// MIDDLEWARE
// ----------------------

// CORS: allow your frontend
app.use(
  cors({
    origin: ["https://your-frontend.vercel.app"], // add localhost if needed for dev
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse cookies
app.use(cookieParser());

// Parse JSON requests
app.use(express.json());

// ----------------------
// ROUTES
// ----------------------

// Simple health check
app.get('/', (req, res) => {
  res.send("Systumm...");
});

app.get('/test', (req, res) => {
  res.send("Backend is live!");
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

// ----------------------
// 404 HANDLER (Wildcard)
// ----------------------

// Replace old `*` with `/*` for Express v5
app.use("/*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
