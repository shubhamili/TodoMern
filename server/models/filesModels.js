import mongoose from "mongoose";

const filesSchema = new mongoose.Schema({
    imageKey: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export const Files = mongoose.model('File', filesSchema);