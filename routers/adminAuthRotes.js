const studentAuth = require('../middleware/student-auth')
const adminAuth = require('../middleware/admin-auth')
const express = require('express')
const  router = express.Router()


router.get('/admin',studentAuth,adminAuth,(req,res) => {
    return res.status(200).json({
        success:true,
        message:'this page visit only admin'
    })
})

module.exports = router