import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";


const createPost = asyncHandler(async (req, res) => {
    if(req.user) throw new ApiError(401, "Unauthorised Access!!!");

    try {
        const user = req.user;
        const text = req.body?.description || "";
        const imgLocalPath = req?.file?.path || "";

        if(! (text || imgLocalPath) ) throw new ApiError(400, "both can not empty!!!");

        const image = await uploadOnCloudinary(imgLocalPath, "post")

        const post = await Post.create({
            text: text || "",
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

    if(req.user) throw new ApiError(401, "Unauthorised Access!!!");

    try {        
        const postId = req.body._id;

        const post = await Post.findById({ _id: postId });
        if(!post) throw new ApiError(400, "post does not exists!!!");

        if(post.image.public_id){
            const isImageDeleted = await deleteFromCloudinary(post.image.public_id);
            if(!isImageDeleted) throw new ApiError(500, "image not deleted!!!");
        }

        await Post.findOneAndDelete({_id: post._id});

        return res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully."));

    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

const updatePost = asyncHandler(async (req, res) => {
    if(req.user) throw new ApiError(401, "Unauthorised Access!!!");

    try {
        
        const postId = req.body._id;

        const post = await Post.findById({ _id: postId });
        if(!post) throw new ApiError(400, "post not found!!!");



    } catch (error) {
        throw new ApiError(400, error.message)
    }
});

export {
    createPost,
    deletePost
}