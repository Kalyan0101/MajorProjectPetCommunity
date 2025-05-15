import mongoose from "mongoose";

const loveSchema = new mongoose.Schema({

    loveBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }

}, { timestamps: true });

export const Love = mongoose.model("Love", loveSchema);