const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const signlogRouter = require('./routers/signlogRouter')
const studentRouteAuth = require('./routers/studentRouteAuth')
const adminAuthRoutes = require('./routers/adminAuthRotes')
const superAdminRoutes = require('./routers/superAdminRoutes')
const imageRoutes = require('./routers/imageRoutes')


connectDB()
const app = express()
app.use(express.json())
app.use('/account',signlogRouter)
app.use('/auth',studentRouteAuth)
app.use('/auth',adminAuthRoutes)
app.use('/auth',superAdminRoutes)
app.use('/image',imageRoutes)

app.get('/',(req,res) => {
    return res.status(200).json({
        success:true,
        message:"college me hu bhai 🙋‍♂️"
    })
})
const PORT = process.env.PORT || 4000
app.listen(PORT,() => {
    console.log(`server listen on PORT No : http://localhost:${PORT}`);
    
})