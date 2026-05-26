import mongoose from "mongoose";

const filesSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
        unique: true
    },
    imageName: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export const Files = mongoose.model('File', filesSchema);