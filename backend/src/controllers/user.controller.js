import { User } from "../models/user.model.js";
import { Pet } from "../models/pet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { createPet } from "./pet.controller.js";

const generateAccessRefreshTokens = async (userId) => {};

const registeruser = asyncHandler(async (req, res) => {
    const { userName, email, fullName, password, location, role } = req.body;
    const userAvatarLocalPath = req.files?.userAvatar[0]?.path;

    if( [ userName, email, fullName, password, location ].some(Field => Field?.trim() === "") ) throw new ApiError(400, "Error: All fields are required!!!");

    const existedUser = await User.findOne({ email });  
    if(existedUser) throw new ApiError(409, "user with same email already exists!!!" );

    const userAvatar = await uploadOnCloudinary(userAvatarLocalPath);
    const pet = await createPet(req.body, req.files);

    if(!pet) throw new ApiError(500, "Pet registration failed!!!");

    const user = await User.create({
        userName: userName?.toLowerCase(),
        email,
        fullName,
        password,
        location,
        role,
        avatar: {
            url: userAvatar?.url,
            public_id: userAvatar?.public_id
        },
        pet: pet?._id
    });

    if(!user) {
        await Pet.deleteOne({
            _id: pet._id
        });
        throw new ApiError(500, "User registration failed!!!");
    }
    
    const userToReturn = user?.toObject();
    delete userToReturn?.password;
    delete userToReturn?.refreshToken;

    return res.status(201).json(new ApiResponse(
        201,
        userToReturn,
        "User with Pet registered successfully."
    ))
});

const userNameVerified = asyncHandler(async (req, res) => {});

const loginUser = asyncHandler(async (req, res) => {});

const logoutUser = asyncHandler(async (req, res) => {});

const changePassword = asyncHandler(async (req, res) => {});

const updateAccountDetails = asyncHandler(async (req, res) => {});

const updateUserAvatar = asyncHandler(async (req, res) => {});

const updatePetAvatar = asyncHandler(async (req, res) => {});

const getCurrentUser = asyncHandler(async (req, res) => {});

const refreshAccessToken = asyncHandler(async (req, res) => {});

export {
    registeruser,
    userNameVerified,
    loginUser,
    logoutUser,
    changePassword,
    updateAccountDetails,
    updatePetAvatar,
    updateUserAvatar,
    getCurrentUser,
    refreshAccessToken,
};
