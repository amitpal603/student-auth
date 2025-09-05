
const adminAuth = (req,res,next) => {
    const {role} = req.userInfo

    if(role !== 'admin') {
        return res.status(401).json({
            success:false,
            message:'Access denied Admin rights require'
        })
    }
    next()
}

module.exports = adminAuth