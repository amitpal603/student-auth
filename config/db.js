const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log('DATABASE connected to backend server');
        
    } catch (error) {
        console.log('Data base  do not connection ',error.message);
        
    }
}

module.exports = connectDB