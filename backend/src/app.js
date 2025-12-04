const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const foodRoutes = require('./routes/food.routes');

const app = express();

// IMPORTANT: Trust proxy for Render
app.set('trust proxy', 1);

// CORS Configuration - YE SABSE PEHLE HONA CHAHIYE
const allowedOrigins = [
    'https://food-app-seven-wheat.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
];

// Add environment variable if exists
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

console.log('🌐 Allowed Origins:', allowedOrigins); // Debug ke liye

app.use(cors({
    origin: function (origin, callback) {
        console.log('📍 Request from origin:', origin); // Debug
        
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('❌ Origin not allowed:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Handle preflight requests explicitly
app.options('*', cors());

// Other middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        env: process.env.NODE_ENV,
        frontendUrl: process.env.FRONTEND_URL,
        timestamp: new Date().toISOString()
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: "Food App Backend API" });
});

// Your routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

module.exports = app;