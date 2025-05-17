import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { Love } from "../models/love.model.js";
import { Comment } from "../models/comment.model.js";


const createPost = asyncHandler(async (req, res) => {    
    
    if(!req.user) throw new ApiError(401, "Unauthorised Access!!!");

    try {
        const user = req.user;
        const text = req.body?.caption || "";
        const imgLocalPath = req?.file?.path || "";

        if(! (text && imgLocalPath) ) throw new ApiError(400, "both can not empty!!!");

        const image = await uploadOnCloudinary(imgLocalPath, "post")

        const post = await Post.create({
            text: text,
            image: {
                url: image?.url || "",
                public_id: image?.public_id || ""
            },
            owner: user._id
        });

        return res
            .status(200)
            .json(new ApiResponse(
                201, 
                post,
                "New post has been created."
            ));

    } catch (error) {
        throw new ApiError(400, error.messsge);
    }
});

const deletePost = asyncHandler(async (req, res) => {

    if(!req.user) throw new ApiError(401, "Unauthorised Access!!!");

    try {        
        const { postId } = req.params;  

        const post = await Post.findById( postId );
        if(!post) throw new ApiError(400, "post does not exists!!!");

        if(post.image.public_id){
            const isImageDeleted = await deleteFromCloudinary(post.image.public_id);
            if(!isImageDeleted) throw new ApiError(500, "image not deleted!!!");
        }

        await Post.findOneAndDelete({ _id: post._id });

        return res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully."));

    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

const updatePost = asyncHandler(async (req, res) => {
    if(!req.user) throw new ApiError(401, "Unauthorised Access!!!");    

    try {        
        const { postId } = req.params;
        const { text } = req?.body || "";

        const post = await Post.findById( postId );
        if(!post) throw new ApiError(400, "post not found!!!");

        if(!text) throw new ApiError(400, "content not found!!!");

        post.text = text;
        const value = await post.save({ validateBeforeSave: false });

        return res.status(200).json(new ApiResponse(
            200,
            value,
            "post updated successfully."
        ))

    } catch (error) {
        throw new ApiError(400, error.message)
    }
});

const allPost = asyncHandler(async (req, res) =>{

    if(!req.user) throw new ApiError(401, "Unauthorised Access!!!");
    
    try {
        const { userId } = req.query;

        const matchCondition = {};

        if(userId) {
            matchCondition.owner = new mongoose.Types.ObjectId(userId)
        }

        const posts = await Post.aggregate([
            {
                $match: matchCondition
            },
            {
                $lookup: {
                    from: "loves",
                    localField: "_id",
                    foreignField: "postId",
                    as: "loves",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "loveBy",
                                foreignField: "_id",
                                as: "loveBy",
                                pipeline: [
                                    {
                                        $project: {
                                            _id:1,
                                            fullName: 1,
                                            email: 1,
                                            avatar: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                loveBy: 1,
                                createdAt: 1
                            }
                        },
                        {
                            $addFields: {
                                loveBy: {
                                    $first: "$loveBy"
                                }
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "commentBy",
                                foreignField: "_id",
                                as: "commentBy",
                                pipeline: [
                                    {
                                        $project: {
                                            _id:1,
                                            fullName: 1,
                                            email: 1,
                                            avatar: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                content: 1,
                                commentBy: 1,
                                createdAt: 1,
                                updatedAt: 1
                            }
                        },
                        {
                            $addFields: {
                                commentBy: {
                                    $first: "$commentBy"
                                }
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner",
                    pipeline: [
                        {
                            $project: {
                                fullName: 1,
                                avatar: 1
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    totalLoves: {
                        $size: "$loves"
                    },
                    owner: {
                        $first: "$owner"
                    }
                }
            },
            {
                $sort: { createdAt: -1 } // -1 = descending, 1 = ascending
            }
        ])

        return res.status(200).json(new ApiResponse(
            200,
            posts,
            "all post fetched successfully"
        ));

    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

const lovePost = asyncHandler(async (req, res) =>{    
    try {
        const user = req.user;
        const { postId } = req.params;
    
        if( !(user && postId)) throw new ApiError(400, "postid and userid are must required!!!");
    
        const isPostValide = await Post.findOne({ _id: postId });
        if(!isPostValide) throw new ApiError(400, "post not found!!!");

        const existingLove = await Love.findOne({ postId, loveBy: user._id });
        if(existingLove){
            await Love.findByIdAndDelete({ _id: existingLove._id });
            return res.status(200).json(new ApiResponse(200, {}, "love removed."));
        }
    
        const love = await Love.create({
            postId,
            loveBy: user._id
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

const commentPost = asyncHandler(async (req, res) =>{
    try {
        
        const { postId } = req.params;
        const { content } = req.body;
        const user = req.user;

        if(! (postId && content && user)) throw new ApiError(400, "postid, user and content all of these are required!!!");

        const isPostValide = await Post.findOne({ _id: postId });
        if(!isPostValide) throw new ApiError(400, "post not found!!!");

        const comment = await Comment.create({
            postId,
            content,
            commentBy: user._id
        });
        return res.status(200).json(new ApiResponse(
            200,
            comment,
            "comment add successfully."
        ));
    } catch (error) {
        throw new ApiError(400, error.message)
    };
});

export {
    createPost,
    deletePost,
    updatePost,
    allPost,
    lovePost,
    commentPost
}