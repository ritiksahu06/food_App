// server.js
require('dotenv').config(); // Load .env variables
const app = require('./src/app'); // Express app
const connectDB = require('./src/db/db'); // MongoDB connection

const PORT = process.env.PORT || 4000;

// Connect to MongoDB Atlas
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// //    Start Server 
// require('dotenv').config();
// const app = require('./src/app');
// const connectDB = require('./src/db/db')

// const Port = 4000;

// connectDB();

// app.listen(Port, () => {
//     console.log(`Server running on port ${Port}`);
// }); 