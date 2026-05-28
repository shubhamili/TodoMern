import express from "express"
import { Addfile, deletefile, editImage, listImages } from "../controllers/filesController.js"
import { upload } from "../middlewares/multer.js"

export const fileRouter = express.Router()

fileRouter.post('/addfiles', upload.single('image'), Addfile)
fileRouter.post('/delete', deletefile)
fileRouter.post('/edit', upload.single('image'), editImage)
fileRouter.get('/list', listImages)
