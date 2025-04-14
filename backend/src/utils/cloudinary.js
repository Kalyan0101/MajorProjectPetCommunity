import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, filePath = "user") => {    
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto",
                folder: `petCommunity/${filePath}`
            }
        );

        if (!response.url)
            throw new ApiError(500, "while uploading the file!!!");

        console.log("File uploaded successfully.");
        return response;

    } catch (error) {
        console.log(error);
        
        return null;
    } finally {
        fs.unlinkSync(localFilePath);
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId);

        if (response.result === "ok") {
            
            console.log("file deleted successfully");            
            return true;
            
        }else return false;

    } catch (error) {
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
