const cloudinary = require('../config/cloudinary')

const UploadImageToCloudinary = async(file) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file)

    return {
        url: uploadResult.secure_url,
        publicId : uploadResult.public_id
    }
  } catch (error) {
    console.log('Error while uploading to cloudinary',error);
    throw new Error('Error while uploading to cloudinary')
  }
}

module.exports = UploadImageToCloudinary