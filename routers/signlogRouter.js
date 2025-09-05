const {signUpStudent,loginStudent} = require('../controllers/student-sign-log')
const express = require('express')

const router = express.Router()

router.post('/sign',signUpStudent)
router.post('/login',loginStudent)

module.exports = router