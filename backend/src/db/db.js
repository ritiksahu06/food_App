const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MongoDB connected successfully");
    }).catch((err)=> {
        console.log("MonogDB connection error: ", err);
        
    })
}

module.exports = connectDB;