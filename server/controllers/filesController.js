import { Files } from "../models/filesModels.js";
import fs from 'fs/promises';
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export const Addfile = async (req, res) => {
    try {
        const something = req.file;

        // console.log('something', something)
        //will use ext later
        const ext = req.file.originalname.split(".").pop();
        const key = `uploads-${Date.now()}-${something.originalname}`

        // console.log('key', key)
        // console.log('process.env.AWS_REGION', process.env.AWS_REGION)
        // console.log('process.env.AWS_BUCKET_NAME', process.env.AWS_BUCKET_NAME)

        const upload = await s3.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            })
        )

        console.log('upload', upload)

        const filesDoc = await Files.create({
            imageName: something.originalname,
            imageKey: key,
            imageUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
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


export const listImages = async (req, res) => {
    try {
        const filesDocs = await Files.find({}).select('-createdAt -updatedAt -__v')

        console.log('filesDocs', filesDocs)

        const filesFromS3 = await Promise.all(
            filesDocs.map(async (file) => {
                const key = file.imageKey;
                const command = new GetObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: key
                });

                const signedUrl = await getSignedUrl(
                    s3,
                    command,
                    { expiresIn: 300 }
                );
                console.log('signedUrl helloooo', signedUrl)

                return {
                    signedUrl,
                    ...file.toObject()
                }
            })
        )

        console.log('filesFromS3', filesFromS3)


        // if (filesDocs.length === 0) {
        //     return res.status(400).json({ messsge: "no files", filesDocs })
        // }
        return res.status(200).json({ messsge: "listing images", data: filesFromS3 })
    } catch (error) {
        console.log('error', error)
        return res.status(500).json(
            { message: "failed something", error }
        )
    }

}