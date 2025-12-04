const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');

const app = express();

// Trust proxy
app.set('trust proxy', 1);

// Allowed origins
const allowedOrigins = [
    'https://food-app-seven-wheat.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
];

if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

console.log('🌐 Allowed Origins:', allowedOrigins);

// CORS middleware - ye automatically preflight handle karega
app.use(cors({
    origin: function (origin, callback) {
        // No origin means same-origin or tools like Postman
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
    maxAge: 86400 // 24 hours preflight cache
}));

// Body parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: "Food App Backend API",
        version: "1.0.0"
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        error: "Route not found",
        path: req.path 
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            error: 'CORS error: Origin not allowed'
        });
    }
    
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

module.exports = app;