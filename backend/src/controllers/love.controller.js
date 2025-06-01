import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Love } from "../models/love.model.js";


const loveDislove = asyncHandler(async (req, res) =>{
    try {
        const user = req.user;
        const { postId } = req.params;
    
        if( !(user && postId)) throw new ApiError(400, "postid and user are must required!!!");
    
        const isPostValide = await Post.findOne({ _id: postId });
        if(!isPostValide) throw new ApiError(400, "post not found!!!");

        const existingLove = await Love.findOne({ postId, lovedBy: user._id });
        if(existingLove){
            await Love.findByIdAndDelete({ _id: existingLove._id });
            return res.status(200).json(new ApiResponse(200, {}, "love removed."));
        }
    
        const love = await Love.create({
            postId,
            lovedBy: user._id
        });
    
        return res.status(200).json(new ApiResponse(
            200, 
            love, 
            "love added."
        ));

    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

export {
    loveDislove,
}