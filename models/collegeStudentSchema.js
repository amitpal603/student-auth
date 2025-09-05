const mongoose = require('mongoose')

const StudentSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type:String,
        enum: ['student','admin','superAdmin'],
        default:'student'
    }
},{timestamps:true})

const Account = mongoose.model('Account',StudentSchema)

module.exports = Account