const studentAuth = require('../middleware/student-auth')
const superAdmin = require('../middleware/superAdmin-auth')
const express = require('express')
const  router = express.Router()


router.get('/super',studentAuth , superAdmin,(req,res) => {
    return res.status(200).json({
        success:true,
        message:'this page visit only superAdmin'
    })
})

module.exports = router