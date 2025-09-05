const jwt = require('jsonwebtoken')
require('dotenv').config()

const studentAuth = (req,res,next) => {
    const authorization = req.headers["authorization"]

    if(!authorization) {
        return res.status(401).json({
            success:false,
            message:'unAuthorized student missing token'
        })
    }

    const token = authorization && authorization.split(" ")[1]

    if(!token) {
        return res.status(400).json({
            success:false,
            message:'token missing please provide token'
        })
    }
     try {
        const decode = jwt.verify(token,process.env.JWT_PRIVATE_KEY)
        console.log(decode);

        req.userInfo = decode
        next()
     } catch (error) {
        return res.status(400).json({
            success:false,
            message:'token has been expired login again'
        })
     }
}

module.exports = studentAuth