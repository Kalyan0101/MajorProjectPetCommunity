import { User } from "../models/user.model.js";
import { Pet } from "../models/pet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessRefreshTokens = async (userId) => {};

const registeruser = asyncHandler(async (req, res) => {
    const { userName, email, fullName, password, location, role } = req.body();
    const userAvatarLocalPath = req.files?.userAvatar[0]?.path;
    const petAvatarLocalPath = req.files?.petAvatar[0]?.path;

    if( [ userName, email, fullName, password, location ].some(Field => Field?.trim() === "") ) throw new ApiError(400, "Error: All fields are required!!!");

    const existedUser = await User.findOne(email);

    if(existedUser) return res.status(409).json(new ApiError(409, "Error: user with same email already exists!!!"));

    const userAvatar = await uploadOnCloudinary(userAvatarLocalPath);
    const petAvatar = await uploadOnCloudinary(petAvatarLocalPath);

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
        }
    }).select("-password -refreshToken");

    return res.status(201).json(new ApiResponse(
        201,
        user,
        "User Registered successfully."
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
