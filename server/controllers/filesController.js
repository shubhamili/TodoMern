import { Files } from "../models/filesModels.js";
import fs from 'fs/promises';



export const Addfile = async (req, res) => {
    try {
        const something = req.file;
        console.log('something', something)
        const filesDoc = await Files.create({
            imageName: something.filename,
            imageUrl: something.path
        })
        if (!filesDoc) {
            return res.status(400).json({ messsge: "file upload failed", filesDoc })
        }
        return res.status(200).json({ messsge: "file uploaded", filesDoc })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json(
            { message: "failed something", error }
        )
    }
}

export const deletefile = async (req, res) => {
    try {
        const { id } = req.body;

        console.log('id', id)

        const ifExistinDb = await Files.findById(id)

        if (!ifExistinDb) {
            return res.status(400).json({ messsge: "this doc is not in db may be alredy deletd", ifExistinDb })

        }

        const deleteDoc = await Files.findByIdAndDelete(id)
        console.log('deleteDoc', deleteDoc)

        if (!deleteDoc) {
            return res.status(400).json({ messsge: "file delete failed", deleteDoc })
        }

        const deleletFromLocal = deleteDoc.imageUrl
        const filePath = deleletFromLocal.replace(/\\/g, '/');

        try {
            await fs.access(filePath);
            await fs.unlink(filePath);
            return res.status(200).json({
                message: 'File deleted from DB and folder',
                deleteDoc
            });
        } catch (err) {
            return res.status(400).json({
                message: 'File not found in uploads folder',
                err
            });
        }

    } catch (error) {
        console.log('error', error)
        return res.status(500).json(
            { message: "failed something", error }
        )
    }
}

export const editImage = async (req, res) => {
    try {
        const { id } = req.body;
        const file = req.file;

        const editable = await Files.findByIdAndUpdate(
            id,
            {
                $set: {
                    imageName: file.filename,
                    imageUrl: file.path
                }
            }
        );

        console.log('editable', editable)


        if (!editable) {
            return res.status(400).json(
                { message: "failed to update db", editable }
            )
        }

        const deleletFromLocal = editable.imageUrl
        const filePath = deleletFromLocal.replace(/\\/g, '/');
        try {
            await fs.access(filePath);
            await fs.unlink(filePath);
            return res.status(200).json({
                message: 'File edited from DB and folder',
                editable
            });
        } catch (err) {
            console.log("error :", err)
            return res.status(400).json({
                message: 'File not found in uploads folder',
                err
            });
        }

    } catch (error) {
        console.log('error', error)
        return res.status(500).json(
            { message: "failed something", error }
        )
    }
}