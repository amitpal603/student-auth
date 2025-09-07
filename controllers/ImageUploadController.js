const UploadImageToCloudinary = require('../Helper/UploadImageCloudinary')
const Image = require('../models/imageSchema')
const cloudinary = require('../config/cloudinary')

const ImageUploadToDataBase = async(req,res) => {  // upload image to our databases
    try {
        if(!req.file){
        return res.status(400).json({
            success:false,
            message:' file most be require ? please upload image '
        })
    }

    const {url,publicId} = await UploadImageToCloudinary(req.file.path)

    const newImage = new Image({url,publicId,uploadedBy:req.userInfo.userId})
        await newImage.save()

        res.status(200).json({
            success:true,
            message:'Image upload successfully..',
            image:newImage
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
} 

const getAllImage = async(req,res) => {  // get all image to save databases
    try {
        const getImage = await Image.find()

        res.status(200).json({
            success:true,
            image:getImage
        })
    } catch (error) {
         res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

const DeleteImageBoth = async(req,res) => { // delete image both side
        const {id} = req.params
        const userId = req.userInfo.userId

        try {
            const image = await Image.findById(id)

            if(!image){
                return res.status(404).json({
                    success:false,
                    message:`Image not found this id : ${id}`
                })
            }

            if(image.uploadedBy.toString() !== userId){
                return res.status(400).json({
                    success:false,
                    message:'Id not match'
                })
            }
            await cloudinary.uploader.destroy(image.publicId)

            const deleteImage = await Image.findByIdAndDelete(id)

            return res.status(200).json({
                success:true,
                message:"Deleted image",
                deleteImage
            })
        } catch (error) {
            return res.status(500).json({
            success: false,
            message: "Internal Server Error",
    });
        }
}
module.exports = {ImageUploadToDataBase,getAllImage,DeleteImageBoth}