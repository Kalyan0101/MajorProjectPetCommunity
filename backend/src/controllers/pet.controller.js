import { Pet } from "../models/pet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createPet = async(details, file) => {
    const { name, type, breed, yob, activity } = details;
    const petAvatarLocalPath = file?.petAvatar[0]?.path;    
    
    if( [name, type, yob, breed].some(field => field.trim() === "") ) throw new ApiError(400, "Error: all fields are required!!!");
    
    const petAvatar = await uploadOnCloudinary(petAvatarLocalPath, "pet");

    const pet = await Pet.create({
        name,
        animalType: type,
        avatar: {
            url: petAvatar?.url,
            public_id: petAvatar?.public_id
        },
        yob,
        breed,
        activity        
    })

    return pet;
}

const registerPet = asyncHandler(async (req, res) => {
    
    const user = req.user?._id;
    const pet = await createPet(req.body(), req.file);

    await User.findByIdAndUpdate(
        user,
        {
            $set: {
                
            }
        }
    )




})

export {
    createPet,
    registerPet,

}