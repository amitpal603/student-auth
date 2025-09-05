const {signUpStudent,loginStudent,changePassword} = require('../controllers/student-sign-log')
const express = require('express')
const studentAuth = require('../middleware/student-auth')

const router = express.Router()

router.post('/sign',signUpStudent)
router.post('/login',loginStudent)
router.post('/change',studentAuth,changePassword)

module.exports = router