import { User } from "../models/user.model.js";
import { Pet } from "../models/pet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { createPet } from "./pet.controller.js";
import jwt from "jsonwebtoken";

const generateAccessRefreshTokens = async (userId) => {
    try {
        
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {accessToken, refreshToken};
        
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, fullName, password, location, role } = req.body;

    let userAvatarLocalPath = "";
    if(req.files && Array.isArray(req.files.userAvatar) && req.files.userAvatar.length > 0){
        userAvatarLocalPath = req.files.userAvatar[0].path;
    }


    if( [ userName, email, fullName, password, location ].some(Field => Field?.trim() === "") ) throw new ApiError(400, "Error: All fields are required!!!");

    const existedUser = await User.findOne({ email });  
    if(existedUser) throw new ApiError(409, "user with same email already exists!!!" );

    const userAvatar = await uploadOnCloudinary(userAvatarLocalPath);
    const pet = await createPet(req.body, req.files.petAvatar[0]);

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

const allUserName = asyncHandler(async (_, res) => {
    const allUserName = await User.find({}, "userName");

    return res.status(200).json(new ApiResponse(
        200,
        allUserName,
        "userName fetched successfully."
    ))
});

const loginUser = asyncHandler(async (req, res) => {
    const { userName, email, password} = req.body;
    if(!(email || userName)) throw new ApiError(400, "UserName or Email required!!!");

    const user = await User.findOne(
        {
            $or: [ { email }, { userName } ]
        }
    );

    if(!user) throw new ApiError(404, "User does not exists!!!");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid) throw new ApiError(401, "Invalid user credentials!!!");

    const { accessToken, refreshToken } = await generateAccessRefreshTokens(user?._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    const userToReturn = user?.toObject();
    delete userToReturn?.password;
    delete userToReturn?.refreshToken;
    Object.freeze(userToReturn);

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
        200,
        userToReturn,
        "User logged in successfully."
    ));
});

const logoutUser = asyncHandler(async (req, res) => {

    const user = req.user;

    if(!user) throw new ApiError(401, "Unauthorised request!!!");

    await User.findByIdAndUpdate(
        user?._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };
    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out."));

});

const changePassword = asyncHandler(async (req, res) => {

    const isAuthorised = req.user;
    if(!isAuthorised) throw new ApiError(401, "Unauthorised Access!!!")
    
    const { oldPassword, newPassword } = req.body;

    if(!(oldPassword && newPassword)) throw new ApiError(400, "Old and new both passwords are required!!!");

    const user = await User.findById(isAuthorised._id);

    const isOldPasswordCorrect = user.isPasswordCorrect(oldPassword);
    if(!isOldPasswordCorrect) throw new ApiError(400, "Old password not matched!!!");

    user.password = newPassword;
    user.save({ validateBeforeSave: false });

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully!!!"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    
    const isAuthorised = req.user;
    if(!isAuthorised) throw new ApiError(400, "Unauthorised Access!!!");

    const updatesField = {};
    if(req.body.fullName) updatesField.fullName = req.body.fullName;
    if(req.body.location) updatesField.location = req.body.location;
    if(req.body.role) updatesField.role = req.body.role;    

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: updatesField },
        { new: true }
    ).select("-password");

    if(!user) throw new ApiError(500, "User updation failed!!!");

    return res.status(200).json(new ApiResponse(
        200,
        user,
        "User updation successful."
    ));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    try {
        const isAuthorised = req.user;
        if(!isAuthorised) throw new ApiError(400, "Unauthorised request!!!");

        const newAvatarLocalPath = req.file?.path || "";
        if(!newAvatarLocalPath) throw new ApiError(400, "Avatar file required!!!");
    
        const oldUser = await User.findById(req.user._id);
        if(!oldUser) throw new ApiError(400, "User does not exists!!!");
    
        const newAvatar = await uploadOnCloudinary(newAvatarLocalPath);
        if(!newAvatar) throw new ApiError(500, "Facing error while uploading the avatar file!!!");
    
        const oldAvatarDeleted = await deleteFromCloudinary(oldUser.avatar.public_id);        

        if(!oldAvatarDeleted){
            await deleteFromCloudinary(newAvatar?.public_id);
            throw new ApiError(500, "Facing defficulties while deleting the old file!!!");
        }
    
        const modifiedNewAvatar = {
            url: newAvatar.url,
            public_id: newAvatar.public_id
        }
    
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    avatar: modifiedNewAvatar
                }
            },
            {
                new: true
            }
        );
    
        return res.status(200).json(new ApiResponse(
            200,
            user,
            "User avatar updated Successfully."
        ));
    } catch (error) {
        throw new ApiError(400, error.message || "update avatar error!!!");
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    
    const isAuthorised = req?.user;
    if(!isAuthorised) throw new ApiError(400, "Unauthorised Access!!! OR User not login!!!");

    const user = await User.findById(req.user._id).select("-password");

    return res.status(200).json(new ApiResponse(
        200,
        user,
        "User Details fetched Successful."
    ));
});

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken) throw new ApiError(400, "Unauthorised request!!!");

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(decodedToken);
        if(!decodedToken) throw new ApiError(400, "Invalid refresh Token!!!");
    
        const user = await User.findById(decodedToken?._id);
    
        if(user?.refreshToken !== incomingRefreshToken) throw new ApiError(400, "Refresh token invalid or used!!!");
    
        const { refreshToken, accessToken } = await generateAccessRefreshTokens(user?._id);
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const userToReturn = user?.toObject();
        delete userToReturn?.password;
        delete userToReturn?.refreshToken;
        Object.freeze(userToReturn);
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            userToReturn,
            "Access token refreshed."
        ));
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid Access Token!!!")
    }
});

const getFollowers = asyncHandler(async (req, res) => {

    const { userName } = req.params;
    if(!userName) throw new ApiError(400, "userName not found!!!");

    const isAuthorised = req.user;
    if(!isAuthorised) throw new ApiError(400, "Unauthorised request!!!");

    const user = await User.aggregate([
        {
            $match: {
                userName: userName.toLowerCase()
            }
        },
        {
            
        }
    ])

});

const getFollowing = asyncHandler(async (req, res) => {});

export {
    registerUser,
    allUserName,
    loginUser,
    logoutUser,
    changePassword,
    updateAccountDetails,
    updateUserAvatar,
    getCurrentUser,
    refreshAccessToken,
};
