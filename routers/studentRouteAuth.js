const studentAuth = require('../middleware/student-auth')
const express = require('express')
const  router = express.Router()


router.get('/student',studentAuth,(req,res) => {
    return res.status(200).json({
        success:true,
        message:'this page visit student'
    })
})

module.exports = router