import mongoose from "mongoose";
import { Pet } from "../models/pet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";


const createPet = async(details, file) => {
    const { name, type, breed, yob, activity } = details;
    const petAvatarLocalPath = file.path;    
    
    if( [name, type, yob, breed].some(field => field.trim() === "") ) throw new ApiError(400, "Error: all fields are required!!!");
    
    const petAvatar = await uploadOnCloudinary(petAvatarLocalPath, "pet");
    if(!petAvatar.url) throw new ApiError(400, "file not uploaded")

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
    });

    return pet;
}

function isAuthorised(req){
    const user = req.user;
    
    if(!user) throw new ApiError(400, "Unauthorised request!!!");
    
    return true;
}

const registerPet = asyncHandler(async (req, res) => {
    
    try {
        const user = req.user?._id;
        const pet = await createPet(req.body, req.file);        
    
        await User.findByIdAndUpdate(
            user,
            {
                $push: {
                    pet: pet._id
                }
            }
        );
    
        return res.status(200).json(new ApiResponse(
            200,
            {},
            "pet added successfully"
        ));
    } catch (error) {
        throw new ApiError(400, error.message || "register pet error");
    }
});

const deletePet = asyncHandler(async (req, res) => {    
    isAuthorised(req);

    const petId = req.body._id;
    if(!petId) throw new ApiError(400, "pet id required");

    const pet = await Pet.findById(petId);
    if(!pet) throw new ApiError(400, "pet does not exists!!!");

    const isAvatarDelete = await deleteFromCloudinary(pet.avatar.public_id);
    if(!isAvatarDelete) throw new ApiError(500, `Something wrong about avatar file!!!, ${isAvatarDelete}`);

    const isPetDelete = await Pet.deleteOne({ _id: pet._id });
    if(!isPetDelete) throw new ApiError(500, "pet not delete Try again afer sometime!!!");

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: {
                // pet: new mongoose.Types.ObjectId(petId)
                pet: petId
            }
        }
    );

    return res.status(200).json(new ApiResponse(
        200,
        {},
        "pet deleted."
    ));
    
});

const updatePetDetails = asyncHandler(async (req, res) => {
    isAuthorised(req);

    const petId = req.body._id;
    if(!petId) throw new ApiError(400, "Pet id required!!!");    

    const updateFields = {};
    if(req.body.name) updateFields.name = req.body.name;
    if(req.body.breed) updateFields.breed = req.body.breed;
    if(req.body.yob) updateFields.yob = req.body.yob;
    if(req.body.activity) updateFields.activity = req.body.activity;

    await Pet.findByIdAndUpdate(
        req.body._id,
        {
            $set: updateFields
        }
    );

    return res.status(200).json(new ApiResponse(
        200,
        {},
        "pet details updated successfully."
    ));
});

const updatePetAvatar = asyncHandler(async (req, res) => {
    isAuthorised(req);

    try {
        const petId = req.body._id;
        if(!petId) throw new ApiError(400, "pet id required.");

        const avatarLocalPath = req.file.path;
        if(!avatarLocalPath) throw new ApiError(400, "Avatar file required!!!");
    
        const petData = await Pet.findById(petId);

        const avatar = await uploadOnCloudinary(avatarLocalPath, "pet");
        if(!avatar) throw new ApiError(500, "facing error while uploading the file");

        const isOldAvatarDelete = await deleteFromCloudinary(petData.avatar.public_id);        

        if(!isOldAvatarDelete){
            await deleteFromCloudinary(avatar.public_id);
            throw new ApiError(500, "facing error while deleting the old file!!!");
        }

        const pet = await Pet.findByIdAndUpdate(
            petData._id,
            {
                $set: {
                    avatar: {
                        url: avatar.url,
                        public_id: avatar.public_id
                    }
                }
            },
            { new: true }
        );

        return res.status(200).json(new ApiResponse(
            200,
            pet,
            "pet avatar file updated successfully."
        ));

    } catch (error) {
        throw new ApiError(400, error);
    }
});

const getAllPet = asyncHandler(async (req, res) => {
    isAuthorised(req);

    try {
        const user = await User.findById(req.user._id).populate("pet");        

        return res.status(200).json(new ApiResponse(
            200,
            user.pet,
            "all pet fatched successfully."
        ));
        
    } catch (error) {
        throw new ApiError(400, error.message || "user not found!!!");
    }
});

export {
    createPet,
    registerPet,
    deletePet,
    updatePetAvatar,
    updatePetDetails,
    getAllPet
}