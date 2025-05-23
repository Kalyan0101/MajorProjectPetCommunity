import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    content: {
        type: String,
        trim: true,
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }

}, { timestamps: true });

export const Comment = mongoose.model("Comment", commentSchema)