import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: true,
        index: true,
        trim: true
    },
    animalType: {
        type: String,
        requied: true,
        trim: true
    },
    avatar: {
        type: Object
    },
    yob: {
        type: Number,
        requied: true
    },
    breed: {
        type: String
    },
    activity: {
        type: String,
        trim: true
    }
}, { timestamps: true });

export const Pet = mongoose.model("Pet", petSchema)