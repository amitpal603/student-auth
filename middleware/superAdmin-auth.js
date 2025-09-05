

const superAuth = (req,res,next) => {
    const {role} = req.userInfo

    if(role !== 'superAdmin'){
        return res.status(400).json({
            success:false,
            message:'This page only superAdmin'
        })
    }
    next()
}

module.exports = superAuth