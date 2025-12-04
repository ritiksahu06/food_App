//   Create Server   

const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const foodPartnerRoutes = require('./routes/food-parter.routes')
const foodRoutes = require('./routes/food.routes')
const cors = require('cors');

const app = express();

// middleware

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://food-app-seven-wheat.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.options("*", cors());


// app.use(cors({
//     origin: "http://localhost:5173",   // old code
//     credentials: true
// }));

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, resp) => {
    resp.send("Systumm...")
})

app.get('/test', (req, res) => {
  res.send("Backend is live!")
})

app.use('/api/auth', authRoutes)
app.use('/api/food/', foodRoutes)
app.use('/api/food-partner/', foodPartnerRoutes)

module.exports = app;
