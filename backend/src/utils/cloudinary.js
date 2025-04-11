import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath)
            throw new ApiError(400, "Error: local file path required!!!");

        const response = await cloudinary.uploader.upload(
            `petCommunity/${localFilePath}`,
            {
                resource_type: "auto",
            }
        );

        if (!response.url)
            throw new ApiError(400, "Error: while uploading the file!!!");

        console.log("File uploaded successfully.");
        return response;
    } catch (error) {
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
