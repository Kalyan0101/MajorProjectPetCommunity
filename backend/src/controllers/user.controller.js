import { User } from "../models/user.model.js";
import { Pet } from "../models/pet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessRefreshTokens = async (userId) => {};

const registeruser = asyncHandler(async (req, res) => {
    
});

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
    loginUser,
    logoutUser,
    changePassword,
    updateAccountDetails,
    updatePetAvatar,
    updateUserAvatar,
    getCurrentUser,
    refreshAccessToken,
};
