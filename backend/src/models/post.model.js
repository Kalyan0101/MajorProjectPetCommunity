import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    text: {
        type: String,
        trim: true,
        default: ""
    },
    image: {
        type: Object,
        default: ""
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Post = mongoose.model("Post", postSchema)