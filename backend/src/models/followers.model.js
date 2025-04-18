import mongoose from "mongoose";

const followersSchema = new mongoose.Schema({
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Followers"
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Followers"
    }
}, { timestaps: true });

export const Followers = mongoose.model("Followers", followersSchema);