const express = require('express')
const router = express.Router()
const  studentAuth = require('../middleware/student-auth')
const adminAuth = require('../middleware/admin-auth')
const superAdmin = require('../middleware/superAdmin-auth')
const {ImageUploadToDataBase,getAllImage,DeleteImageBoth} = require('../controllers/ImageUploadController')
const  image = require('../middleware/image')

router.post('/upload',studentAuth,adminAuth ,image.single('image'),ImageUploadToDataBase)
router.post('/upload',studentAuth,superAdmin,image.single('image'),ImageUploadToDataBase)
router.get('/getImage',studentAuth,getAllImage)
router.delete('/delete/:id',studentAuth,adminAuth,DeleteImageBoth)
router.delete('/delete/:id',studentAuth,superAdmin,DeleteImageBoth)

module.exports = router