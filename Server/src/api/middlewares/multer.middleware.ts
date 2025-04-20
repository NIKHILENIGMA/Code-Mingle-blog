import { Request } from 'express'
import multer from 'multer'
import path from 'node:path'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileFilterCallback = (error: Error | null, filename: string) => void

const fileStorage = multer.diskStorage({
    destination: (_: Request, __: Express.Multer.File, cb: DestinationCallback) => {
        cb(null, './public/uploads')
    },
    filename: (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const uniqueSuffix: string = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, file.filename + '-' + uniqueSuffix + path.extname(file.originalname))
    },
})

export const upload = multer({
    storage: fileStorage,
    fileFilter: (_: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const fileTypes = /jpeg|jpg|png/

        const mineTypes = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())

        if (mineTypes && extName) {
            return cb(null, true)
        } else {
            return cb(new Error('Error: Only jpeg, jpg, png files are allowed!'))
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB file size
    }
})
