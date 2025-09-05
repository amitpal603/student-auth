const Account = require('../models/collegeStudentSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const signUpStudent = async(req,res) => {  // sign up controller
        const {name,email,password,role} = req.body

        try {
            const user = await Account.findOne({email})

            if(user){
                return res.status(400).json({
                    success:false,
                    message:`Your Email ${email} is already exist so try to again new Email sign up ..?`
                })
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)

            const newStudent = new Account(
                {
                    name,
                    email,
                    password:hashPassword,
                    role:role || 'student'
                }
            )
            await newStudent.save()

            res.status(200).json({
                success:true,
                message:'Sign Up successfully .. ? 👌'
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:`sign up ${error.message}`
            })
        }
}

const loginStudent = async(req,res) => {  // login controller
  const {email,password} = req.body

  try {
    const checkEmail = await Account.findOne({email})

    if(!checkEmail) {
        return res.status(404).json({
            success:false,
            message:'Email can not found'
        })
    }

    const isPassword = await bcrypt.compare(password,checkEmail.password)

    if(!isPassword){
        return res.status(400).json({
            success:false,
            message:'Invalid Password or Email'
        })
    }

    const payload = {
        userId : checkEmail._id,
        role: checkEmail.role
    }

    const token = jwt.sign(payload,process.env.JWT_PRIVATE_KEY,{
        expiresIn: '1d'
    })

    res.cookie("token",token,{
        httpOnly: true,
    })

    res.status(200).json({
        success:true,
        message:'login successfully',
        token
    })
  } catch (error) {
    
  }
}

const changePassword = async(req,res) => {  // change password
        const {oldPassword , newPassword} = req.body
        const id = req.userInfo.userId
        try {
            const user = await Account.findById(id)

            if(!user) {
                return res.status(404).json({
                    success:false,
                    message:`this id ${id} not any user`
                })
            }
            const isPassword = await bcrypt.compare(oldPassword,user.password)

            if(!isPassword) {
                return res.status(400).json({
                    success:false,
                    message:'Wrong Password please try again 😥'
                })
            }
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(newPassword,salt)

            user.password = hashPassword
            await user.save()

            res.status(200).json({
                success:true,
                message:'Password was change successfully 👻'
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Internal server Error'
            })
        }
}
module.exports = {signUpStudent,loginStudent,changePassword}